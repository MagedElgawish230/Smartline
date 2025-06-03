import { useRealtimeSubscription } from '@/hooks/useRealtimeSubscription';
import { Database } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare } from 'lucide-react';

type ContactMessage = Database['public']['Tables']['contact_messages']['Row'];

export function ContactMessages() {
  const { toast } = useToast();
  const { data: messages, loading, error } = useRealtimeSubscription<ContactMessage>({
    table: 'contact_messages',
    onInsert: (newMessage) => {
      console.log('New message received:', newMessage);
      toast({
        title: 'New Contact Message',
        description: `New message from ${newMessage.name}`,
      });
    },
    onUpdate: (updatedMessage) => {
      console.log('Message updated:', updatedMessage);
      toast({
        title: 'Message Updated',
        description: `Message from ${updatedMessage.name} has been updated`,
      });
    },
    onDelete: (deletedMessage) => {
      console.log('Message deleted:', deletedMessage);
      toast({
        title: 'Message Deleted',
        description: `Message from ${deletedMessage.name} has been deleted`,
      });
    },
  });

  if (loading) return <div className="text-center py-8">Loading messages...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Contact Messages
        </CardTitle>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No messages found
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {messages.map((message) => (
              <Card key={message.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span className="font-semibold">{message.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <span className="text-gray-600">{message.email}</span>
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Message:</span>
                      <p className="text-gray-600 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">
                        {message.message}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      Received: {format(new Date(message.created_at), 'PPp')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 