-- Enable row-level security for the driver_applications table
ALTER TABLE public.driver_applications ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow authenticated users to insert their own driver application
CREATE POLICY "Authenticated users can insert their own driver applications" ON public.driver_applications
FOR INSERT WITH CHECK (
  auth.uid() = user_id
); 