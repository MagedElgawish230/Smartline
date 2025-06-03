-- Enable row-level security for the driver_applications table if not already enabled
ALTER TABLE public.driver_applications ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow authenticated users to update driver applications
CREATE POLICY "Authenticated users can update driver applications"
ON public.driver_applications
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create a policy to allow authenticated users to view driver applications
CREATE POLICY "Authenticated users can view driver applications"
ON public.driver_applications
FOR SELECT
TO authenticated
USING (true); 