import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { TablesInsert, Enums } from '@/integrations/supabase/types';

// Helper function to upload files (you might want to move this to a separate file like fileUpload.ts)
const uploadDriverDocument = async (file: File, userId: string, type: string, index: number = 0) => {
  const filePath = `${userId}/${type}/${type}-${index}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('driver-documents') // Use the driver-documents bucket
    .upload(filePath, file, { cacheControl: '3600', upsert: false });

  if (error) {
    console.error(`Error uploading ${type} file ${index}:`, error);
    return null;
  }

  // Get the public URL
  const { data: publicUrlData } = supabase.storage
    .from('driver-documents')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};

const uploadDriverPhoto = async (file: File, userId: string) => {
  const filePath = `${userId}/driver_photo/${file.name}`;
  const { data, error } = await supabase.storage
    .from('driver-photos') // Use the driver-photos bucket
    .upload(filePath, file, { cacheControl: '3600', upsert: false });

  if (error) {
    console.error('Error uploading driver photo:', error);
    return null;
  }

  // Get the public URL
  const { data: publicUrlData } = supabase.storage
    .from('driver-photos')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};

const DriverProfileForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    identityType: '',
    identityNumber: '',
    passwordConfirmation: '',
    licenseNumber: '',
    licenseExpiry: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    vehiclePlate: '',
    vehicleType: '',
    driverPhoto: null as File | null,
    drivingLicense: [] as File[],
    leadershipLicense: [] as File[],
    driverCard: [] as File[],
    carFrontPhoto: [] as File[],
    carBackPhoto: [] as File[],
    criminalRecord: [] as File[],
  });

  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.user_metadata?.full_name?.split(' ')[0] || '',
        lastName: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const files = Array.from(e.target.files || []);

    if (fieldName === 'driverPhoto') {
      setFormData({
        ...formData,
        [fieldName]: files[0] || null,
      });
    } else {
      setFormData({
        ...formData,
        [fieldName]: files,
      });
    }
  };

  const handleSelectChange = (value: string, fieldName: string) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      toast({
        title: "Error",
        description: "User not authenticated.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    if (formData.passwordConfirmation !== user.user_metadata?.password) {
        toast({
           title: "Error",
           description: "Password confirmation does not match.",
            variant: "destructive",
        });
        setLoading(false);
        return;
    }

    try {
      // Upload files first
      const uploadedUrls: any = {};

      if (formData.driverPhoto) {
        uploadedUrls.driverPhotoUrl = await uploadDriverPhoto(formData.driverPhoto, user.id);
      }

      if (formData.drivingLicense.length > 0) {
        uploadedUrls.drivingLicenseUrls = await Promise.all(formData.drivingLicense.map((file, index) =>
          uploadDriverDocument(file, user.id, 'driving_license', index)
        ));
      }

      if (formData.leadershipLicense.length > 0) {
        uploadedUrls.leadershipLicenseUrls = await Promise.all(formData.leadershipLicense.map((file, index) =>
          uploadDriverDocument(file, user.id, 'leadership_license', index)
        ));
      }

      if (formData.driverCard.length > 0) {
        uploadedUrls.driverCardUrls = await Promise.all(formData.driverCard.map((file, index) =>
          uploadDriverDocument(file, user.id, 'driver_card', index)
        ));
      }

      if (formData.carFrontPhoto.length > 0) {
        uploadedUrls.carFrontUrls = await Promise.all(formData.carFrontPhoto.map((file, index) =>
          uploadDriverDocument(file, user.id, 'car_front', index)
        ));
      }

      if (formData.carBackPhoto.length > 0) {
        uploadedUrls.carBackUrls = await Promise.all(formData.carBackPhoto.map((file, index) =>
          uploadDriverDocument(file, user.id, 'car_back', index)
        ));
      }

      if (formData.criminalRecord.length > 0) {
        uploadedUrls.criminalRecordUrls = await Promise.all(formData.criminalRecord.map((file, index) =>
          uploadDriverDocument(file, user.id, 'criminal_record', index)
        ));
      }

      // Prepare data for insertion into driver_applications table
      const driverApplicationData: TablesInsert<'driver_applications'> = {
        user_id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        identity_type: formData.identityType,
        identity_number: formData.identityNumber,
        password_confirmation: formData.passwordConfirmation,
        driver_photo_url: uploadedUrls.driverPhotoUrl || null,
        driving_license_url: uploadedUrls.drivingLicenseUrls?.[0] || null,
        leadership_license_url: uploadedUrls.leadershipLicenseUrls?.[0] || null,
        driver_card_url: uploadedUrls.driverCardUrls?.[0] || null,
        car_front_photo_url: uploadedUrls.carFrontUrls?.[0] || null,
        car_back_photo_url: uploadedUrls.carBackUrls?.[0] || null,
        criminal_record_url: uploadedUrls.criminalRecordUrls?.[0] || null,
        status: 'pending',
      };

      // Insert data into the driver_applications table
      const { error: dbError } = await supabase
        .from('driver_applications')
        .insert([driverApplicationData]);

      if (dbError) {
        console.error('Database insertion error:', dbError);
        throw dbError;
      }

      toast({
        title: "Driver Application Submitted",
        description: "Your driver application has been submitted for review.",
      });

      // Redirect to a confirmation page or dashboard
      navigate('/dashboard');

    } catch (error: any) {
      console.error('Driver application submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit driver application.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const FileUploadField = ({
    label,
    fieldName,
    required = false,
    multiple = false
  }: {
    label: string;
    fieldName: string;
    required?: boolean;
    multiple?: boolean;
  }) => {
    const fieldValue = formData[fieldName as keyof typeof formData];
    const hasFiles = multiple
      ? Array.isArray(fieldValue) && fieldValue.length > 0
      : fieldValue !== null;

    const getDisplayText = () => {
      if (!hasFiles) return `Choose File${multiple ? '(s)' : ''}`;

      if (multiple && Array.isArray(fieldValue)) {
        return fieldValue.length === 1
          ? fieldValue[0].name
          : `${fieldValue.length} files selected`;
      }

      return (fieldValue as File)?.name || `Choose File${multiple ? '(s)' : ''}`;
    };

    return (
      <div className="space-y-2">
        <Label htmlFor={fieldName}>
          {label} {required && '*'}
        </Label>
        <div className="flex items-center space-x-2">
          <Input
            id={fieldName}
            type="file"
            onChange={(e) => handleFileChange(e, fieldName)}
            accept="image/*,.pdf"
            multiple={multiple}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById(fieldName)?.click()}
            className="flex-1 justify-start"
          >
            {getDisplayText()}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Application</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Information Fields (pre-filled from auth) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} required disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} required disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" name="phone" type="text" value={formData.phone} onChange={handleInputChange} required />
            </div>
          </div>

          {/* Identification Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="identityType">ID Type *</Label>
              <Select onValueChange={(value) => handleSelectChange(value, 'identityType')} value={formData.identityType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="national_id">National ID</SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="driver_license">Driver License</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="identityNumber">ID Number *</Label>
              <Input id="identityNumber" name="identityNumber" type="text" value={formData.identityNumber} onChange={handleInputChange} required />
            </div>
          </div>

          {/* Password Confirmation */}
          <div className="space-y-2">
            <Label htmlFor="passwordConfirmation">Confirm Password *</Label>
            <Input id="passwordConfirmation" name="passwordConfirmation" type="password" value={formData.passwordConfirmation} onChange={handleInputChange} required />
          </div>

          {/* Document Uploads */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Required Documents</h3>
            <FileUploadField
              label="Driver Photo"
              fieldName="driverPhoto"
              required
            />
            <FileUploadField
              label="Driving License"
              fieldName="drivingLicense"
              required
              multiple
            />
            <FileUploadField
              label="Leadership License"
              fieldName="leadershipLicense"
              required
              multiple
            />
            <FileUploadField
              label="Driver Card"
              fieldName="driverCard"
              required
              multiple
            />
            <FileUploadField
              label="Car Front Photo"
              fieldName="carFrontPhoto"
              required
              multiple
            />
            <FileUploadField
              label="Car Back Photo"
              fieldName="carBackPhoto"
              required
              multiple
            />
            <FileUploadField
              label="Criminal Record"
              fieldName="criminalRecord"
              multiple
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DriverProfileForm;
 