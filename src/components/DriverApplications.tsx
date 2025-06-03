import { useEffect, useState } from 'react';
import { useRealtimeSubscription } from '@/hooks/useRealtimeSubscription';
import { Database } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type DriverApplication = Database['public']['Tables']['driver_applications']['Row'];

export function DriverApplications() {
  const [editingApplication, setEditingApplication] = useState<DriverApplication | null>(null);
  const { toast } = useToast();
  const { data: applications, loading, error, refetch } = useRealtimeSubscription<DriverApplication>({
    table: 'driver_applications',
    onInsert: (newApplication) => {
      console.log('New application received:', newApplication);
      toast({
        title: 'New Application',
        description: `New driver application from ${newApplication.first_name} ${newApplication.last_name}`,
      });
    },
    onUpdate: (updatedApplication) => {
      console.log('Application updated:', updatedApplication);
      toast({
        title: 'Application Updated',
        description: `Driver application for ${updatedApplication.first_name} ${updatedApplication.last_name} has been updated`,
      });
    },
    onDelete: (deletedApplication) => {
      console.log('Application deleted:', deletedApplication);
      toast({
        title: 'Application Deleted',
        description: `Driver application for ${deletedApplication.first_name} ${deletedApplication.last_name} has been deleted`,
      });
    },
  });

  const handleEdit = async (application: DriverApplication) => {
    try {
      console.log('[DriverApplications] Starting update for application:', {
        id: application.id,
        first_name: application.first_name,
        last_name: application.last_name,
        status: application.status
      });
      
      const { data, error } = await supabase
        .from('driver_applications')
        .update({
          first_name: application.first_name,
          last_name: application.last_name,
          email: application.email,
          phone: application.phone,
          status: application.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', application.id)
        .select();

      if (error) {
        console.error('[DriverApplications] Supabase error:', error);
        throw error;
      }

      console.log('[DriverApplications] Update response:', data);

      // Manually refetch the data to ensure we have the latest state
      console.log('[DriverApplications] Manually refetching data');
      await refetch();

      toast({
        title: 'Success',
        description: 'Driver application updated successfully',
      });
      setEditingApplication(null);
    } catch (error: any) {
      console.error('[DriverApplications] Error updating application:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update driver application',
        variant: 'destructive',
      });
    }
  };

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Driver Applications</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{application.first_name} {application.last_name}</span>
                <Badge variant={application.status === 'approved' ? 'secondary' : 'default'}>
                  {application.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Email:</strong> {application.email}</p>
                <p><strong>Phone:</strong> {application.phone}</p>
                <p><strong>Applied:</strong> {format(new Date(application.created_at || ''), 'PPp')}</p>
                {application.updated_at && (
                  <p><strong>Last Updated:</strong> {format(new Date(application.updated_at), 'PPp')}</p>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setEditingApplication(application)}
                    >
                      Edit Application
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Driver Application</DialogTitle>
                    </DialogHeader>
                    {editingApplication && (
                      <form 
                        className="space-y-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleEdit(editingApplication);
                        }}
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              value={editingApplication.first_name}
                              onChange={(e) => setEditingApplication({
                                ...editingApplication,
                                first_name: e.target.value
                              })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={editingApplication.last_name}
                              onChange={(e) => setEditingApplication({
                                ...editingApplication,
                                last_name: e.target.value
                              })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editingApplication.email}
                            onChange={(e) => setEditingApplication({
                              ...editingApplication,
                              email: e.target.value
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={editingApplication.phone || ''}
                            onChange={(e) => setEditingApplication({
                              ...editingApplication,
                              phone: e.target.value
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={editingApplication.status || 'pending'}
                            onValueChange={(value) => setEditingApplication({
                              ...editingApplication,
                              status: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setEditingApplication(null)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 