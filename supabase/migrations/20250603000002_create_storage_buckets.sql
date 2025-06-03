
-- Create storage buckets for driver photos and documents
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('driver-photos', 'driver-photos', true),
  ('driver-documents', 'driver-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for driver-photos bucket
CREATE POLICY "Authenticated users can upload driver photos" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'driver-photos');

CREATE POLICY "Authenticated users can view driver photos" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING (bucket_id = 'driver-photos');

CREATE POLICY "Users can update their own driver photos" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'driver-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own driver photos" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'driver-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create policies for driver-documents bucket
CREATE POLICY "Authenticated users can upload driver documents" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'driver-documents');

CREATE POLICY "Authenticated users can view driver documents" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING (bucket_id = 'driver-documents');

CREATE POLICY "Users can update their own driver documents" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'driver-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own driver documents" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'driver-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
