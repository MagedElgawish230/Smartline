import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface DriverRegistrationFormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
}

const DriverRegistrationForm = ({ onSubmit, loading = false }: DriverRegistrationFormProps) => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    identityType: '',
    identityNumber: '',
    driverPhoto: null as File | null,
    drivingLicense: [] as File[],
    leadershipLicense: [] as File[],
    driverCard: [] as File[],
    carFrontPhoto: [] as File[],
    carBackPhoto: [] as File[],
    criminalRecord: [] as File[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      identityType: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Pass the form data with files directly to the parent
    await onSubmit(formData);
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
      if (!hasFiles) return t('driver.chooseFile');
      
      if (multiple && Array.isArray(fieldValue)) {
        return fieldValue.length === 1 
          ? fieldValue[0].name 
          : `${fieldValue.length} files selected`;
      }
      
      return (fieldValue as File)?.name || t('driver.chooseFile');
    };

    return (
      <div className="space-y-2">
        <Label htmlFor={fieldName} className={isRTL ? 'font-cairo' : 'font-inter'}>
          {label} {required && '*'}
        </Label>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
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
            className={`flex-1 justify-start ${isRTL ? 'font-cairo' : 'font-inter'}`}
          >
            {getDisplayText()}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className={`text-center text-xl ${isRTL ? 'font-cairo' : 'font-inter'}`}>
          {t('driver.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {t('driver.firstName')} *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className={`h-10 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {t('driver.lastName')} *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className={`h-10 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {t('driver.phone')} *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className={`h-10 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={isRTL ? 'font-cairo' : 'font-inter'}>
                {t('driver.idType')} *
              </Label>
              <Select onValueChange={handleSelectChange} required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder={t('driver.selectIdType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="national_id">{t('driver.nationalId')}</SelectItem>
                  <SelectItem value="passport">{t('driver.passport')}</SelectItem>
                  <SelectItem value="driver_license">{t('driver.driverLicense')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="identityNumber" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {t('driver.idNumber')} *
              </Label>
              <Input
                id="identityNumber"
                name="identityNumber"
                type="text"
                value={formData.identityNumber}
                onChange={handleInputChange}
                required
                className={`h-10 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
              />
            </div>
          </div>

          {/* File Uploads */}
          <div className="space-y-4">
            <h3 className={`text-base font-semibold ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              Required Documents
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUploadField 
                label={t('driver.driverPhoto')} 
                fieldName="driverPhoto" 
                required 
              />
              <FileUploadField 
                label={t('driver.drivingLicense')} 
                fieldName="drivingLicense" 
                required 
                multiple
              />
              <FileUploadField 
                label={t('driver.leadershipLicense')} 
                fieldName="leadershipLicense" 
                required 
                multiple
              />
              <FileUploadField 
                label={t('driver.driverCard')} 
                fieldName="driverCard" 
                required 
                multiple
              />
              <FileUploadField 
                label={t('driver.carFront')} 
                fieldName="carFrontPhoto" 
                required 
                multiple
              />
              <FileUploadField 
                label={t('driver.carBack')} 
                fieldName="carBackPhoto" 
                required 
                multiple
              />
            </div>
            
            <FileUploadField 
              label={t('driver.criminalRecord')} 
              fieldName="criminalRecord" 
              multiple
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-10 text-base font-medium bg-primary-600 hover:bg-primary-700"
            disabled={loading}
          >
            {loading ? 'Submitting...' : t('driver.submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DriverRegistrationForm;
