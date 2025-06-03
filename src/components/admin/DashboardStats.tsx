
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Car, Star, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const DashboardStats = () => {
  const { isRTL } = useLanguage();
  const [stats, setStats] = useState({
    totalDrivers: 0,
    pendingApplications: 0,
    averageRating: 0,
    totalRevenue: 0
  });

  const translations = {
    en: {
      totalDrivers: 'Total Drivers',
      pendingApplications: 'Pending Applications',
      averageRating: 'Average Rating',
      totalRevenue: 'Total Revenue'
    },
    ar: {
      totalDrivers: 'إجمالي السائقين',
      pendingApplications: 'الطلبات المعلقة',
      averageRating: 'متوسط التقييم',
      totalRevenue: 'إجمالي الإيرادات'
    }
  };

  const currentLang = isRTL ? 'ar' : 'en';

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch total drivers
      const { count: totalDrivers } = await supabase
        .from('driver_applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved');

      // Fetch pending applications
      const { count: pendingApplications } = await supabase
        .from('driver_applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Fetch average rating
      const { data: ratingData } = await supabase
        .from('driver_applications')
        .select('rating')
        .eq('status', 'approved');

      const avgRating = ratingData?.length 
        ? ratingData.reduce((sum, driver) => sum + (driver.rating || 0), 0) / ratingData.length
        : 0;

      // Fetch total revenue
      const { data: earningsData } = await supabase
        .from('driver_applications')
        .select('earnings')
        .eq('status', 'approved');

      const totalRevenue = earningsData?.reduce((sum, driver) => sum + (driver.earnings || 0), 0) || 0;

      setStats({
        totalDrivers: totalDrivers || 0,
        pendingApplications: pendingApplications || 0,
        averageRating: Number(avgRating.toFixed(1)),
        totalRevenue: totalRevenue
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    {
      title: translations[currentLang].totalDrivers,
      value: stats.totalDrivers,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: translations[currentLang].pendingApplications,
      value: stats.pendingApplications,
      icon: Car,
      color: 'text-orange-600'
    },
    {
      title: translations[currentLang].averageRating,
      value: stats.averageRating,
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      title: translations[currentLang].totalRevenue,
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
