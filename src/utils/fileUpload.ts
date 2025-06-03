
import { supabase } from '@/integrations/supabase/client';

export const uploadDriverPhoto = async (file: File, userId: string, fileName: string): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/${fileName}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('driver-photos')
      .upload(filePath, file, {
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('driver-photos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('File upload error:', error);
    return null;
  }
};

export const uploadDriverDocument = async (file: File, userId: string, documentType: string, index?: number): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = index !== undefined ? `${documentType}_${index}` : documentType;
    const filePath = `${userId}/${fileName}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('driver-documents')
      .upload(filePath, file, {
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('driver-documents')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('File upload error:', error);
    return null;
  }
};
