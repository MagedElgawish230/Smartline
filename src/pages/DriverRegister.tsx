import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DriverRegistrationForm from '@/components/DriverRegistrationForm';
import { uploadDriverPhoto, uploadDriverDocument } from '@/utils/fileUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components

const DriverRegister = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the authenticated user
  const { toast } = useToast();

  // Function to upload files to Supabase Storage
  const uploadFilesWithUserId = async (driverData: any, userId: string) => {
    const uploadedUrls: any = {};
    
    // Upload driver photo
    if (driverData.driverPhoto && driverData.driverPhoto.length > 0) {
      const photoUrl = await uploadDriverPhoto(driverData.driverPhoto[0], userId, 'driver_photo');
      if (photoUrl) uploadedUrls.driverPhotoUrl = photoUrl;
    }

    // Upload driving license files
    if (driverData.drivingLicense && driverData.drivingLicense.length > 0) {
      const urls = [];
      for (let i = 0; i < driverData.drivingLicense.length; i++) {
        const url = await uploadDriverDocument(driverData.drivingLicense[i], userId, 'driving_license', i);
        if (url) urls.push(url);
      }
      uploadedUrls.drivingLicenseUrls = urls;
    }

    // Upload leadership license files
    if (driverData.leadershipLicense && driverData.leadershipLicense.length > 0) {
      const urls = [];
      for (let i = 0; i < driverData.leadershipLicense.length; i++) {
        const url = await uploadDriverDocument(driverData.leadershipLicense[i], userId, 'leadership_license', i);
        if (url) urls.push(url);
      }
      uploadedUrls.leadershipLicenseUrls = urls;
    }

    // Upload driver card files
    if (driverData.driverCard && driverData.driverCard.length > 0) {
      const urls = [];
      for (let i = 0; i < driverData.driverCard.length; i++) {
        const url = await uploadDriverDocument(driverData.driverCard[i], userId, 'driver_card', i);
        if (url) urls.push(url);
      }
      uploadedUrls.driverCardUrls = urls;
    }

    // Upload car front photo files
    if (driverData.carFrontPhoto && driverData.carFrontPhoto.length > 0) {
      const urls = [];
      for (let i = 0; i < driverData.carFrontPhoto.length; i++) {
        const url = await uploadDriverDocument(driverData.carFrontPhoto[i], userId, 'car_front', i);
        if (url) urls.push(url);
      }
      uploadedUrls.carFrontUrls = urls;
    }

    // Upload car back photo files
    if (driverData.carBackPhoto && driverData.carBackPhoto.length > 0) {
      const urls = [];
      for (let i = 0; i < driverData.carBackPhoto.length; i++) {
        const url = await uploadDriverDocument(driverData.carBackPhoto[i], userId, 'car_back', i);
        if (url) urls.push(url);
      }
      uploadedUrls.carBackUrls = urls;
    }

    // Upload criminal record files
    if (driverData.criminalRecord && driverData.criminalRecord.length > 0) {
      const urls = [];
      for (let i = 0; i < driverData.criminalRecord.length; i++) {
        const url = await uploadDriverDocument(driverData.criminalRecord[i], userId, 'criminal_record', i);
        if (url) urls.push(url);
      }
      uploadedUrls.criminalRecordUrls = urls;
    }

    return uploadedUrls;
  };

  const handleDriverRegistration = async (driverData: any) => {
    if (!user) {
      toast({
        title: "Error",
        description: "User not authenticated. Please sign in first.",
        variant: "destructive",
      });
      navigate('/auth?mode=login'); // Redirect to login if not authenticated
      return;
    }

    setLoading(true);
    try {
      console.log('Driver registration data:', driverData);

      // Upload files with the authenticated user ID
      const uploadedUrls = await uploadFilesWithUserId(driverData, user.id);

      // Store driver application in database
      const { error: dbError } = await supabase
        .from('driver_applications')
        .insert({
          user_id: user.id,
          first_name: driverData.firstName,
          last_name: driverData.lastName,
          email: user.email, // Use email from authenticated user
          phone: driverData.phone,
          identity_type: driverData.identityType,
          identity_number: driverData.identityNumber,
          driver_photo_url: uploadedUrls.driverPhotoUrl,
          driving_license_url: uploadedUrls.drivingLicenseUrls?.[0],
          leadership_license_url: uploadedUrls.leadershipLicenseUrls?.[0],
          driver_card_url: uploadedUrls.driverCardUrls?.[0],
          car_front_photo_url: uploadedUrls.carFrontUrls?.[0],
          car_back_photo_url: uploadedUrls.carBackUrls?.[0],
          criminal_record_url: uploadedUrls.criminalRecordUrls?.[0],
          status: 'pending'
        } as any); // Cast to any to bypass type check temporarily

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      toast({
        title: "Application Submitted",
        description: "Your driver application has been submitted successfully. We will review it shortly.",
      });

      // Redirect after successful submission, e.g., to a dashboard or confirmation page
      navigate('/dashboard'); // Replace with appropriate route

    } catch (error: any) {
      console.error('Driver application error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit driver application",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-4xl font-bold text-primary-600 mb-2">SmartLine</h1>
          </Link>
          <p className="text-gray-600">Driver Application</p>
        </div>

        {/* Driver Registration Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              Complete Your Driver Application
            </CardTitle>
            <CardDescription>
              Please provide the required information and documents to apply to be a driver.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DriverRegistrationForm
              onSubmit={handleDriverRegistration}
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverRegister;
 