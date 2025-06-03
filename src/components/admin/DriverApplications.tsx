
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Eye, Check, X } from 'lucide-react';

interface DriverApplication {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  earnings: number;
  total_trips: number;
  rating: number;
}

const DriverApplications = () => {
  const { isRTL } = useLanguage();
  const { toast } = useToast();
  const [applications, setApplications] = useState<DriverApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const translations = {
    en: {
      driverApplications: 'Driver Applications',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      status: 'Status',
      dateApplied: 'Date Applied',
      earnings: 'Earnings',
      trips: 'Trips',
      rating: 'Rating',
      actions: 'Actions',
      approve: 'Approve',
      reject: 'Reject',
      view: 'View',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      noApplications: 'No driver applications found'
    },
    ar: {
      driverApplications: 'طلبات السائقين',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      status: 'الحالة',
      dateApplied: 'تاريخ التقديم',
      earnings: 'الأرباح',
      trips: 'الرحلات',
      rating: 'التقييم',
      actions: 'الإجراءات',
      approve: 'موافقة',
      reject: 'رفض',
      view: 'عرض',
      pending: 'معلق',
      approved: 'مقبول',
      rejected: 'مرفوض',
      noApplications: 'لا توجد طلبات سائقين'
    }
  };

  const currentLang = isRTL ? 'ar' : 'en';

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('driver_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch driver applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('driver_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Application ${status} successfully`,
      });

      fetchApplications();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { variant: 'secondary' as const, text: translations[currentLang].pending },
      approved: { variant: 'default' as const, text: translations[currentLang].approved },
      rejected: { variant: 'destructive' as const, text: translations[currentLang].rejected }
    };

    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <Badge variant={statusInfo?.variant || 'secondary'}>
        {statusInfo?.text || status}
      </Badge>
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations[currentLang].driverApplications}</CardTitle>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <p className="text-center text-gray-600 py-8">
            {translations[currentLang].noApplications}
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{translations[currentLang].name}</TableHead>
                <TableHead>{translations[currentLang].email}</TableHead>
                <TableHead>{translations[currentLang].phone}</TableHead>
                <TableHead>{translations[currentLang].status}</TableHead>
                <TableHead>{translations[currentLang].earnings}</TableHead>
                <TableHead>{translations[currentLang].trips}</TableHead>
                <TableHead>{translations[currentLang].rating}</TableHead>
                <TableHead>{translations[currentLang].actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">
                    {app.first_name} {app.last_name}
                  </TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.phone}</TableCell>
                  <TableCell>{getStatusBadge(app.status)}</TableCell>
                  <TableCell>${app.earnings?.toFixed(2) || '0.00'}</TableCell>
                  <TableCell>{app.total_trips || 0}</TableCell>
                  <TableCell>{app.rating?.toFixed(1) || '0.0'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {/* TODO: Implement view details */}}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {app.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateApplicationStatus(app.id, 'approved')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateApplicationStatus(app.id, 'rejected')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default DriverApplications;
