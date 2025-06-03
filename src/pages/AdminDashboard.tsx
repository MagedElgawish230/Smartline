import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Car, Star, TrendingUp, MessageSquare } from 'lucide-react';
import DriverApplications from '@/components/admin/DriverApplications';
import DashboardStats from '@/components/admin/DashboardStats';
import DriversDashboard from '@/components/admin/DriversDashboard';
import { ContactMessages } from '@/components/admin/ContactMessages';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user has admin access (you'll need to fetch this from your profile)
  const isAdmin = true; // TODO: Replace with actual admin check

  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const translations = {
    en: {
      dashboard: 'Admin Dashboard',
      overview: 'Overview',
      drivers: 'Driver Applications',
      driversList: 'Drivers List',
      messages: 'Contact Messages',
      totalDrivers: 'Total Drivers',
      pendingApplications: 'Pending Applications',
      averageRating: 'Average Rating',
      totalRevenue: 'Total Revenue'
    },
    ar: {
      dashboard: 'لوحة إدارة المشرف',
      overview: 'نظرة عامة',
      drivers: 'طلبات السائقين',
      driversList: 'قائمة السائقين',
      messages: 'رسائل الاتصال',
      totalDrivers: 'إجمالي السائقين',
      pendingApplications: 'الطلبات المعلقة',
      averageRating: 'متوسط التقييم',
      totalRevenue: 'إجمالي الإيرادات'
    }
  };

  const currentLang = isRTL ? 'ar' : 'en';

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto p-6">
        <h1 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          {translations[currentLang].dashboard}
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{translations[currentLang].overview}</TabsTrigger>
            <TabsTrigger value="drivers">{translations[currentLang].drivers}</TabsTrigger>
            <TabsTrigger value="driversList">{translations[currentLang].driversList}</TabsTrigger>
            <TabsTrigger value="messages">{translations[currentLang].messages}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardStats />
          </TabsContent>

          <TabsContent value="drivers">
            <DriverApplications />
          </TabsContent>

          <TabsContent value="driversList">
            <DriversDashboard />
          </TabsContent>

          <TabsContent value="messages">
            <ContactMessages />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
