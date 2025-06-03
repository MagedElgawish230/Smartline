import { DriverApplications } from './DriverApplications';
import { ContactMessages } from './ContactMessages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AdminDashboard() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">Driver Applications</TabsTrigger>
          <TabsTrigger value="messages">Contact Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications">
          <DriverApplications />
        </TabsContent>
        
        <TabsContent value="messages">
          <ContactMessages />
        </TabsContent>
      </Tabs>
    </div>
  );
} 