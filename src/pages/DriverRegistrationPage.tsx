import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DriverProfileForm from '@/components/DriverProfileForm';

const DriverRegistrationPage = () => {
  const { user, loading } = useAuth();

  // Redirect if user is not logged in or is not a driver
  if (!loading && (!user || user.user_metadata.role !== 'driver')) {
    // You might want to redirect to a different page or show an error
    // For now, let's redirect to the home page
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <DriverProfileForm />
      </div>
    </div>
  );
};

export default DriverRegistrationPage; 