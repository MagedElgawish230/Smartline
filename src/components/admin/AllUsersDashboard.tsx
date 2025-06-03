import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ContactMessages } from './ContactMessages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import FeedbackList from '@/components/FeedbackList';

interface User {
  id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'driver' | 'passenger';
  is_verified: boolean | null;
  total_rides: number | null;
}

const AllUsersDashboard = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editForm, setEditForm] = useState<Partial<User>>({});
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) {
      setUsers(data || []);
    }
    setLoading(false);
  };

  // DELETE
  const handleDelete = async () => {
    if (!deleteUser) return;
    
    try {
      setDeleteLoading(true);
      
      // First, check if the user exists
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', deleteUser.id)
        .single();

      if (checkError || !existingUser) {
        throw new Error('User not found');
      }

      // Delete the user
      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', deleteUser.id);

      if (deleteError) {
        throw deleteError;
      }

      // Show success message
      toast({
        title: 'Success',
        description: `User ${deleteUser.full_name} has been deleted successfully`,
      });

      // Refresh the users list
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete user. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeleteLoading(false);
      setDeleteUser(null);
    }
  };

  // VIEW
  const handleView = (user: User) => {
    setSelectedUser(user);
    setViewOpen(true);
  };

  // EDIT
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditForm({ ...user });
    setEditOpen(true);
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditRole = (value: string) => {
    setEditForm({ ...editForm, role: value as 'admin' | 'driver' | 'passenger' });
  };
  const handleEditVerified = (value: string) => {
    setEditForm({ ...editForm, is_verified: value === 'true' });
  };
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setEditLoading(true);
    await supabase.from('profiles').update({
      full_name: editForm.full_name,
      email: editForm.email,
      role: editForm.role,
      is_verified: editForm.is_verified,
    }).eq('id', selectedUser.id);
    setEditLoading(false);
    setEditOpen(false);
    setSelectedUser(null);
    fetchUsers();
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="messages">Contact Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SL</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total Rides</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">Loading...</TableCell>
                      </TableRow>
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">No users found</TableCell>
                      </TableRow>
                    ) : (
                      users.map((user, idx) => (
                        <TableRow key={user.id}>
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell>{user.full_name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'admin' ? 'default' : user.role === 'driver' ? 'secondary' : 'outline'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {user.is_verified ? (
                              <Badge variant="outline" className="text-green-600">Verified</Badge>
                            ) : (
                              <Badge variant="destructive">Unverified</Badge>
                            )}
                          </TableCell>
                          <TableCell>{user.total_rides ?? 0}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {/* Delete */}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    title="Delete"
                                    disabled={deleteLoading && deleteUser?.id === user.id}
                                  >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete {user.full_name}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => { 
                                        setDeleteUser(user); 
                                        handleDelete(); 
                                      }} 
                                      disabled={deleteLoading}
                                      className="bg-red-500 hover:bg-red-600"
                                    >
                                      {deleteLoading && deleteUser?.id === user.id ? 'Deleting...' : 'Delete'}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                              {/* Edit */}
                              <Dialog open={editOpen && selectedUser?.id === user.id} onOpenChange={setEditOpen}>
                                <DialogTrigger asChild>
                                  <Button size="icon" variant="ghost" title="Edit" onClick={() => handleEdit(user)}>
                                    <Pencil className="w-4 h-4 text-yellow-500" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit User</DialogTitle>
                                  </DialogHeader>
                                  <form onSubmit={handleEditSubmit} className="space-y-4">
                                    <Input name="full_name" value={editForm.full_name || ''} onChange={handleEditChange} placeholder="Full Name" required />
                                    <Input name="email" value={editForm.email || ''} onChange={handleEditChange} placeholder="Email" required />
                                    <Select value={editForm.role || ''} onValueChange={handleEditRole}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Role" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="admin">admin</SelectItem>
                                        <SelectItem value="driver">driver</SelectItem>
                                        <SelectItem value="passenger">passenger</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <Select value={String(editForm.is_verified)} onValueChange={handleEditVerified}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Verified" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="true">Verified</SelectItem>
                                        <SelectItem value="false">Unverified</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <DialogFooter>
                                      <Button type="submit" disabled={editLoading}>{editLoading ? 'Saving...' : 'Save'}</Button>
                                      <DialogClose asChild>
                                        <Button type="button" variant="outline">Cancel</Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </form>
                                </DialogContent>
                              </Dialog>
                              {/* View */}
                              <Dialog open={viewOpen && selectedUser?.id === user.id} onOpenChange={setViewOpen}>
                                <DialogTrigger asChild>
                                  <Button size="icon" variant="ghost" title="View" onClick={() => handleView(user)}>
                                    <Eye className="w-4 h-4 text-blue-500" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>User Details</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-2">
                                    <div><b>Name:</b> {selectedUser?.full_name}</div>
                                    <div><b>Email:</b> {selectedUser?.email}</div>
                                    <div><b>Role:</b> {selectedUser?.role}</div>
                                    <div><b>Status:</b> {selectedUser?.is_verified ? 'Verified' : 'Unverified'}</div>
                                    <div><b>Total Rides:</b> {selectedUser?.total_rides ?? 0}</div>
                                  </div>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button type="button" variant="outline">Close</Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <FeedbackList />
        </TabsContent>
        
        <TabsContent value="messages">
          <ContactMessages />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AllUsersDashboard; 