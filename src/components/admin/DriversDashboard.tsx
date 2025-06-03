import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Driver {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  driver_photo_url: string | null;
  status: string | null;
  is_active: boolean | null;
  earnings: number | null;
  total_trips: number | null;
  rating: number | null;
  profile_completion: number | null;
  level: string | null;
}

const arabicLabels = {
  title: 'قائمة السائقين',
  sl: 'SL',
  name: 'الاسم',
  contact: 'معلومات الاتصال',
  profileStatus: 'حالة الملف الشخصي',
  level: 'المستوى',
  referrals: 'إجمالي الإحالات',
  earnings: 'الأرباح',
  status: 'الحالة',
  actions: 'إجراء',
  edit: 'تعديل',
  delete: 'حذف',
  view: 'عرض',
};

const getLevel = (total_trips: number | null) => {
  if (!total_trips) return 'Level 1';
  if (total_trips >= 20) return 'Level 2';
  return 'Level 1';
};

const getProfileCompletion = (driver: Driver) => {
  // Dummy logic for profile completion
  let filled = 0;
  if (driver.first_name) filled++;
  if (driver.last_name) filled++;
  if (driver.email) filled++;
  if (driver.phone) filled++;
  if (driver.driver_photo_url) filled++;
  if (driver.earnings) filled++;
  if (driver.total_trips) filled++;
  if (driver.rating) filled++;
  return Math.round((filled / 8) * 100);
};

const DriversDashboard = () => {
  const { toast } = useToast();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewDriver, setViewDriver] = useState<Driver | null>(null);
  const [editDriver, setEditDriver] = useState<Driver | null>(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('driver_applications')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'خطأ', description: 'فشل في جلب بيانات السائقين', variant: 'destructive' });
    } else {
      setDrivers(
        (data || []).map((d: any) => ({
          ...d,
          profile_completion: getProfileCompletion(d),
          level: getLevel(d.total_trips),
        }))
      );
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا السائق؟')) return;
    const { error } = await supabase.from('driver_applications').delete().eq('id', id);
    if (error) {
      toast({ title: 'خطأ', description: 'فشل في حذف السائق', variant: 'destructive' });
    } else {
      toast({ title: 'تم الحذف', description: 'تم حذف السائق بنجاح' });
      fetchDrivers();
    }
  };

  const handleEdit = (driver: Driver) => {
    setEditDriver(driver);
    // Open edit modal (to be implemented)
  };

  const handleView = (driver: Driver) => {
    setViewDriver(driver);
    // Open view modal (to be implemented)
  };

  const handleToggleActive = async (driver: Driver) => {
    const { error } = await supabase
      .from('driver_applications')
      .update({ is_active: !driver.is_active })
      .eq('id', driver.id);
    if (error) {
      toast({ title: 'خطأ', description: 'فشل في تحديث الحالة', variant: 'destructive' });
    } else {
      fetchDrivers();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{arabicLabels.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{arabicLabels.sl}</TableHead>
                <TableHead>{arabicLabels.name}</TableHead>
                <TableHead>{arabicLabels.contact}</TableHead>
                <TableHead>{arabicLabels.profileStatus}</TableHead>
                <TableHead>{arabicLabels.level}</TableHead>
                <TableHead>{arabicLabels.referrals}</TableHead>
                <TableHead>{arabicLabels.earnings}</TableHead>
                <TableHead>{arabicLabels.status}</TableHead>
                <TableHead>{arabicLabels.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">جاري التحميل...</TableCell>
                </TableRow>
              ) : drivers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">لا يوجد سائقون</TableCell>
                </TableRow>
              ) : (
                drivers.map((driver, idx) => (
                  <TableRow key={driver.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {driver.driver_photo_url && (
                          <img src={driver.driver_photo_url} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                        )}
                        <span>{driver.first_name} {driver.last_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold">{driver.phone}</span>
                        <span className="text-xs text-gray-500">{driver.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{driver.profile_completion || 0}%</span>
                        <div className="w-20 h-2 bg-gray-200 rounded">
                          <div className="h-2 bg-gray-700 rounded" style={{ width: `${driver.profile_completion || 0}%` }}></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{driver.level}</Badge>
                    </TableCell>
                    <TableCell>{driver.total_trips || 0}</TableCell>
                    <TableCell>EGP {driver.earnings?.toLocaleString() || 0}</TableCell>
                    <TableCell>
                      <Switch checked={!!driver.is_active} onCheckedChange={() => handleToggleActive(driver)} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(driver.id)} title={arabicLabels.delete}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(driver)} title={arabicLabels.edit}>
                          <Pencil className="w-4 h-4 text-yellow-500" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleView(driver)} title={arabicLabels.view}>
                          <Eye className="w-4 h-4 text-blue-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {/* TODO: Add modals for edit and view */}
      </CardContent>
    </Card>
  );
};

export default DriversDashboard; 