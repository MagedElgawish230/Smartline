import { useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type TableName = keyof Database['public']['Tables'];

interface UseRealtimeSubscriptionOptions<T> {
  table: TableName;
  onInsert?: (payload: T) => void;
  onUpdate?: (payload: T) => void;
  onDelete?: (payload: T) => void;
  filter?: string;
}

export function useRealtimeSubscription<T extends Database['public']['Tables'][TableName]['Row']>({
  table,
  onInsert,
  onUpdate,
  onDelete,
  filter,
}: UseRealtimeSubscriptionOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    console.log(`[useRealtimeSubscription] Fetching data for table: ${table}`);
    try {
      const { data: fetchedData, error: fetchError } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error(`[useRealtimeSubscription] Error fetching data:`, fetchError);
        throw fetchError;
      }
      
      console.log(`[useRealtimeSubscription] Fetched ${fetchedData?.length || 0} records`);
      setData(fetchedData as T[] || []);
    } catch (err) {
      console.error(`[useRealtimeSubscription] Error in fetchData:`, err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(`[useRealtimeSubscription] Setting up subscription for table: ${table}`);
    let channel: RealtimeChannel;

    const setupSubscription = () => {
      console.log(`[useRealtimeSubscription] Creating channel for table: ${table}`);
      channel = supabase
        .channel(`${table}_changes`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: table,
            filter: filter,
          },
          async (payload) => {
            console.log(`[useRealtimeSubscription] Received real-time update:`, {
              eventType: payload.eventType,
              table: payload.table,
              schema: payload.schema,
              new: payload.new,
              old: payload.old
            });
            
            // Fetch fresh data after any change
            await fetchData();

            // Also trigger the appropriate callback
            switch (payload.eventType) {
              case 'INSERT':
                console.log(`[useRealtimeSubscription] Triggering onInsert callback`);
                onInsert?.(payload.new as T);
                break;
              case 'UPDATE':
                console.log(`[useRealtimeSubscription] Triggering onUpdate callback`);
                onUpdate?.(payload.new as T);
                break;
              case 'DELETE':
                console.log(`[useRealtimeSubscription] Triggering onDelete callback`);
                onDelete?.(payload.old as T);
                break;
            }
          }
        )
        .subscribe((status) => {
          console.log(`[useRealtimeSubscription] Subscription status:`, status);
        });
    };

    // Initial data fetch
    fetchData();
    setupSubscription();

    return () => {
      console.log(`[useRealtimeSubscription] Cleaning up subscription for table: ${table}`);
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [table, filter, onInsert, onUpdate, onDelete]);

  return { data, error, loading, refetch: fetchData };
} 