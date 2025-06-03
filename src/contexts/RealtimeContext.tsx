import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type TableName = keyof Database['public']['Tables'];

interface RealtimeContextType {
  subscribe: (table: TableName, callback: (payload: any) => void) => () => void;
  unsubscribe: (table: TableName) => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Map<string, any>>(new Map());
  const { toast } = useToast();

  const subscribe = (table: TableName, callback: (payload: any) => void) => {
    const channel = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
        },
        (payload) => {
          callback(payload);
          toast({
            title: 'Database Update',
            description: `${payload.eventType} operation on ${table}`,
          });
        }
      )
      .subscribe();

    setSubscriptions((prev) => new Map(prev).set(table, channel));

    return () => {
      supabase.removeChannel(channel);
      setSubscriptions((prev) => {
        const newMap = new Map(prev);
        newMap.delete(table);
        return newMap;
      });
    };
  };

  const unsubscribe = (table: TableName) => {
    const channel = subscriptions.get(table);
    if (channel) {
      supabase.removeChannel(channel);
      setSubscriptions((prev) => {
        const newMap = new Map(prev);
        newMap.delete(table);
        return newMap;
      });
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup all subscriptions on unmount
      subscriptions.forEach((channel) => {
        supabase.removeChannel(channel);
      });
    };
  }, []);

  return (
    <RealtimeContext.Provider value={{ subscribe, unsubscribe }}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
} 