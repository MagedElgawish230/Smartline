import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import DriverRegistrationForm from '@/components/DriverRegistrationForm'; // Import the form component
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { uploadDriverPhoto, uploadDriverDocument } from '@/utils/fileUpload'; // Import file upload utilities

// Define an interface for the form data
interface AuthFormData {
  email: string;
  password: string;
  fullName: string;
  role: 'passenger' | 'driver'; // Explicitly type the role
}

const Auth = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  // Check if we should show login or signup based on URL or query params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const mode = urlParams.get('mode');
    if (mode === 'login') {
      setIsLogin(true);
    } else if (mode === 'signup') {
      setIsLogin(false);
    }
  }, [location]);

  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    fullName: '',
    role: 'passenger', // Add role to state, default to passenger
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        navigate('/');
      } else {
        const { error, data } = await signUp(formData.email, formData.password, formData.fullName, formData.role);

        if (error) {
          throw error;
        }

        if (data?.user) {
          navigate('/');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: isLogin ? "Login Failed" : "Registration Failed",
        description: error.message || (isLogin ? "Failed to login" : "Failed to register"),
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Keep this handleDriverRegistration function for now, it might be moved or refactored later
  // const handleDriverRegistration = async (driverData: any) => {
  //   setLoading(true);
  //   try {
  //     console.log('Driver registration data:', driverData);
      
  //     // First create the user account
  //     const { data: authData, error: authError } = await supabase.auth.signUp({
  //       email: driverData.email,
  //       password: driverData.password,
  //       options: {
  //         data: {
  //           full_name: `${driverData.firstName} ${driverData.lastName}`,
  //           role: 'driver'
  //         }
  //       }
  //     });

  //     if (authError) throw authError;

  //     if (authData.user) {
  //       // Now upload files with the real user ID
  //       const uploadedUrls = await uploadFilesWithUserId(driverData, authData.user.id);
        
  //       // Store driver application in database
  //       const { error: dbError } = await supabase
  //         .from('driver_applications')
  //         .insert({
  //           user_id: authData.user.id,
  //           first_name: driverData.firstName,
  //           last_name: driverData.lastName,
  //           email: driverData.email,
  //           phone: driverData.phone,
  //           identity_type: driverData.identityType,
  //           identity_number: driverData.identityNumber,
  //           password_confirmation: driverData.passwordConfirmation,
  //           driver_photo_url: uploadedUrls.driverPhotoUrl,
  //           driving_license_url: uploadedUrls.drivingLicenseUrls?.[0],
  //           leadership_license_url: uploadedUrls.leadershipLicenseUrls?.[0],
  //           driver_card_url: uploadedUrls.driverCardUrls?.[0],
  //           car_front_photo_url: uploadedUrls.carFrontUrls?.[0],
  //           car_back_photo_url: uploadedUrls.carBackUrls?.[0],
  //           criminal_record_url: uploadedUrls.criminalRecordUrls?.[0],
  //           status: 'pending'
  //         });

  //     if (dbError) {
  //       console.error('Database error:', dbError);
  //       throw dbError;
  //     }

  //       toast({
  //         title: "Registration Successful",
  //         description: "Your driver application has been submitted. Please check your email to verify your account.",
  //       });
  //     }
  //   } catch (error: any) {
  //     console.error('Driver registration error:', error);
  //     toast({
  //       title: "Registration Failed",
  //       description: error.message || "Failed to register driver",
  //       variant: "destructive",
  //     });
  //   }
  //   setLoading(false);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-4xl font-bold text-primary-600 mb-2">SmartLine</h1>
          </Link>
          <p className="text-gray-600">Your smart transportation solution</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Sign in to your account to continue' 
                : 'Create your SmartLine account today'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="h-12"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => setFormData({ ...formData, role: value as 'passenger' | 'driver' })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passenger">Passenger</SelectItem>
                        <SelectItem value="driver">Driver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-medium bg-primary-600 hover:bg-primary-700"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </div>
            </form>

            {/* Switch between login/register */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary-600 hover:text-primary-700 font-medium p-0 h-auto"
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </Button>
            </div>

            {/* Back to home */}
            <div className="mt-4 text-center">
              <Link to="/">
                <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
