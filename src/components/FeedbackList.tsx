import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Star, Trash2 } from 'lucide-react';

interface Feedback {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
}

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setFeedbacks(data as Feedback[]);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setDeleteLoading(true);
    await supabase.from('feedback').delete().eq('id', id);
    setDeleteLoading(false);
    setDeleteId(null);
    fetchFeedbacks();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card className="mt-8 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary-700 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-400" /> All Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No feedback found</TableCell>
                </TableRow>
              ) : (
                feedbacks.map((fb, idx) => (
                  <TableRow
                    key={fb.id}
                    className={
                      idx % 2 === 0
                        ? 'bg-white hover:bg-primary-50 transition-colors'
                        : 'bg-gray-50 hover:bg-primary-50 transition-colors'
                    }
                  >
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < fb.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            fill={i < fb.rating ? '#facc15' : 'none'}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({fb.rating})</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-gray-700">{fb.comment}</TableCell>
                    <TableCell className="text-gray-500 text-sm">{new Date(fb.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            title="Delete"
                            onClick={() => setDeleteId(fb.id)}
                            disabled={deleteLoading && deleteId === fb.id}
                            className="hover:bg-red-50"
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Feedback</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this feedback? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(fb.id)}
                              disabled={deleteLoading}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              {deleteLoading && deleteId === fb.id ? 'Deleting...' : 'Delete'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default FeedbackList; 