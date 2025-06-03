import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UserProfile from '@/components/UserProfile';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-700 text-lg">Loading user data...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <Header />
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
      <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
