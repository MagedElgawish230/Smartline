import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UserProfile from '@/components/UserProfile';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import DriversDashboard from '@/components/admin/DriversDashboard';
import AllUsersDashboard from '@/components/admin/AllUsersDashboard';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = React.useState<any>(null);
  const [profileLoading, setProfileLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setProfileLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  if (loading || profileLoading) {
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
          {profile && profile.role === 'admin' ? <AllUsersDashboard /> : <UserProfile />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
