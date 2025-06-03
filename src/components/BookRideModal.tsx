
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Navigation } from 'lucide-react';

interface BookRideModalProps {
  children: React.ReactNode;
}

const BookRideModal = ({ children }: BookRideModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const [rideData, setRideData] = useState({
    pickupAddress: '',
    destinationAddress: '',
    vehicleType: 'economy' as const,
  });

  const handleBookRide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // In a real app, you'd use a geocoding service to get coordinates
      // For now, we'll use placeholder coordinates
      const { error } = await supabase.from('rides').insert({
        passenger_id: user.id,
        pickup_address: rideData.pickupAddress,
        pickup_latitude: 40.7128, // Example: NYC coordinates
        pickup_longitude: -74.0060,
        destination_address: rideData.destinationAddress,
        destination_latitude: 40.7589,
        destination_longitude: -73.9851,
        vehicle_type: rideData.vehicleType,
        estimated_fare: Math.floor(Math.random() * 50) + 10, // Random fare for demo
      });

      if (error) throw error;

      toast({
        title: "Ride Booked!",
        description: "Your ride has been requested. A driver will be assigned shortly.",
      });

      setOpen(false);
      setRideData({
        pickupAddress: '',
        destinationAddress: '',
        vehicleType: 'economy',
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book a Ride</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleBookRide} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pickup">Pickup Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="pickup"
                type="text"
                placeholder="Enter pickup address"
                className="pl-10"
                value={rideData.pickupAddress}
                onChange={(e) => setRideData({ ...rideData, pickupAddress: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <div className="relative">
              <Navigation className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="destination"
                type="text"
                placeholder="Enter destination address"
                className="pl-10"
                value={rideData.destinationAddress}
                onChange={(e) => setRideData({ ...rideData, destinationAddress: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicle-type">Vehicle Type</Label>
            <Select value={rideData.vehicleType} onValueChange={(value: any) => setRideData({ ...rideData, vehicleType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="comfort">Comfort</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Booking...' : 'Book Ride'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookRideModal;
