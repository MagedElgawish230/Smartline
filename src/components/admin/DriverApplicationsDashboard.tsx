import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface DriverApplication {
  id: string;
  user_id: string | null; // user_id can be null initially, based on your schema
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  identity_type: string | null;
  identity_number: string | null;
  password_confirmation: string | null;
  driver_photo_url: string | null;
  driving_license_url: string | null;
  leadership_license_url: string | null;
  driver_card_url: string | null;
  car_front_photo_url: string | null;
  car_back_photo_url: string | null;
  criminal_record_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

const DriverApplicationsDashboard = () => {
  const [applications, setApplications] = useState<DriverApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [approving, setApproving] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState<string | null>(null);
  const [viewingImages, setViewingImages] = useState<DriverApplication | null>(null); // State to store the application whose images are being viewed
  const [downloading, setDownloading] = useState(false); // New state for download loading
  const { toast } = useToast();

  const fetchDriverApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('driver_applications')
      .select('*') // Select all columns directly from driver_applications
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching driver applications:', error);
      setError('Failed to load driver applications. Please try again.');
    } else {
      // Ensure status is correctly typed, as it comes as 'text'
      const typedData = data?.map(app => ({
        ...app,
        status: app.status as 'pending' | 'approved' | 'rejected',
      })) || [];
      setApplications(typedData as DriverApplication[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDriverApplications();
  }, []);

  const handleApprove = async (application: DriverApplication) => {
    setApproving(application.id);
    try {
      const { error: updateError } = await supabase
        .from('driver_applications')
        .update({ status: 'approved' })
        .eq('id', application.id);

      if (updateError) throw updateError;

      // Only update the profile role if user_id is not null
      if (application.user_id) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ role: 'driver' })
          .eq('id', application.user_id);

        if (profileError) throw profileError;
      }

      toast({
        title: 'Success',
        description: `Driver application for ${application.first_name} ${application.last_name} approved and user role updated.`, 
      });

      fetchDriverApplications();
    } catch (err) {
      console.error('Error approving driver application:', err);
      toast({
        title: 'Error',
        description: 'Failed to approve application.',
        variant: 'destructive',
      });
    } finally {
      setApproving(null);
    }
  };

  const handleReject = async (application: DriverApplication) => {
    setRejecting(application.id);
    try {
      const { error: updateError } = await supabase
        .from('driver_applications')
        .update({ status: 'rejected' })
        .eq('id', application.id);

      if (updateError) throw updateError;

      toast({
        title: 'Success',
        description: `Driver application for ${application.first_name} ${application.last_name} rejected.`, 
      });

      fetchDriverApplications();
    } catch (err) {
      console.error('Error rejecting driver application:', err);
      toast({
        title: 'Error',
        description: 'Failed to reject application.',
        variant: 'destructive',
      });
    } finally {
      setRejecting(null);
    }
  };

  const handleDownloadAllPhotos = async (application: DriverApplication) => {
    setDownloading(true);
    const zip = new JSZip();
    let hasPhotos = false;

    const photoUrls = [
      { url: application.driver_photo_url, name: 'driver_photo' },
      { url: application.driving_license_url, name: 'driving_license' },
      { url: application.leadership_license_url, name: 'leadership_license' },
      { url: application.driver_card_url, name: 'driver_card' },
      { url: application.car_front_photo_url, name: 'car_front_photo' },
      { url: application.car_back_photo_url, name: 'car_back_photo' },
      { url: application.criminal_record_url, name: 'criminal_record' },
    ];

    for (const photo of photoUrls) {
      if (photo.url) {
        try {
          hasPhotos = true;
          const response = await fetch(photo.url);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${photo.name}: ${response.statusText}`);
          }
          const blob = await response.blob();
          // Extract file extension from the URL
          const fileName = photo.url.substring(photo.url.lastIndexOf('/') + 1);
          zip.file(`${photo.name}_${fileName}`, blob);
        } catch (error) {
          console.error(`Error adding ${photo.name} to zip:`, error);
          toast({
            title: 'Download Warning',
            description: `Could not download ${photo.name}. Some files might be missing.`, 
            variant: 'destructive',
          });
        }
      }
    }

    if (hasPhotos) {
      zip.generateAsync({ type: 'blob' })
        .then(function (content) {
          saveAs(content, `driver_applications_${application.first_name}_${application.last_name}.zip`);
          toast({
            title: 'Download Complete',
            description: `All available photos for ${application.first_name} ${application.last_name} downloaded.`, 
          });
        })
        .catch(error => {
          console.error('Error generating zip file:', error);
          toast({
            title: 'Download Error',
            description: 'Failed to generate zip file.',
            variant: 'destructive',
          });
        })
        .finally(() => {
          setDownloading(false);
        });
    } else {
      toast({
        title: 'No Photos Found',
        description: 'No photos available to download for this driver application.',
        variant: 'default',
      });
      setDownloading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Images</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">Loading driver applications...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-red-500">{error}</TableCell>
                </TableRow>
              ) : applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">No driver applications found.</TableCell>
                </TableRow>
              ) : (
                applications.map((app, idx) => (
                  <TableRow key={app.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{app.first_name} {app.last_name}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>
                      <Badge variant={app.status === 'pending' ? 'secondary' : app.status === 'approved' ? 'default' : 'destructive'}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(app.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setViewingImages(app)}
                      >
                        View Photos
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      {viewingImages && (
        <Dialog open={!!viewingImages} onOpenChange={() => setViewingImages(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader className="flex justify-between items-center">
              <DialogTitle>Driver Images for {viewingImages.first_name} {viewingImages.last_name}</DialogTitle>
              <Button 
                onClick={() => handleDownloadAllPhotos(viewingImages)}
                disabled={downloading}
                className="ml-4"
              >
                {downloading ? 'Downloading...' : 'Download All Photos'}
              </Button>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
              {viewingImages.driver_photo_url && (
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-2">Driver Photo</h3>
                  <img src={viewingImages.driver_photo_url} alt="Driver Photo" className="max-w-full h-auto rounded-md shadow-md" />
                </div>
              )}
              {viewingImages.driving_license_url && (
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-2">Driving License</h3>
                  <img src={viewingImages.driving_license_url} alt="Driving License" className="max-w-full h-auto rounded-md shadow-md" />
                </div>
              )}
              {viewingImages.leadership_license_url && (
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-2">Leadership License</h3>
                  <img src={viewingImages.leadership_license_url} alt="Leadership License" className="max-w-full h-auto rounded-md shadow-md" />
                </div>
              )}
              {viewingImages.driver_card_url && (
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-2">Driver Card</h3>
                  <img src={viewingImages.driver_card_url} alt="Driver Card" className="max-w-full h-auto rounded-md shadow-md" />
                </div>
              )}
              {viewingImages.car_front_photo_url && (
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-2">Car Front Photo</h3>
                  <img src={viewingImages.car_front_photo_url} alt="Car Front Photo" className="max-w-full h-auto rounded-md shadow-md" />
                </div>
              )}
              {viewingImages.car_back_photo_url && (
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-2">Car Back Photo</h3>
                  <img src={viewingImages.car_back_photo_url} alt="Car Back Photo" className="max-w-full h-auto rounded-md shadow-md" />
                </div>
              )}
              {viewingImages.criminal_record_url && (
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-2">Criminal Record</h3>
                  <img src={viewingImages.criminal_record_url} alt="Criminal Record" className="max-w-full h-auto rounded-md shadow-md" />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default DriverApplicationsDashboard;
