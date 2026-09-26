import crypto from 'crypto';

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
}

/**
 * Uploads a base64 Data URL or image buffer to Cloudinary via REST API.
 * If Cloudinary environment variables are missing, returns null so caller can fallback to MongoDB direct storage.
 */
export async function uploadToCloudinary(
  base64OrBufferData: string,
  folder: string = 'canva_replica_user_uploads'
): Promise<CloudinaryUploadResult | null> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  // Check if Cloudinary configuration exists
  if (!cloudName) {
    console.log('ℹ️ [Cloudinary]: CLOUDINARY_CLOUD_NAME missing in env, falling back to database storage.');
    return null;
  }

  try {
    const formData = new FormData();
    formData.append('file', base64OrBufferData);
    formData.append('folder', folder);

    if (uploadPreset) {
      // Unsigned Upload using Upload Preset
      formData.append('upload_preset', uploadPreset);
    } else if (apiKey && apiSecret) {
      // Signed Upload
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
      const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
    } else {
      console.warn('⚠️ [Cloudinary]: Neither CLOUDINARY_UPLOAD_PRESET nor API_KEY/API_SECRET provided.');
      return null;
    }

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('❌ [Cloudinary HTTP Error]:', response.status, errText);
      return null;
    }

    const data = await response.json();
    if (data.secure_url) {
      console.log('✅ [Cloudinary Upload Success]:', data.secure_url);
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    }
  } catch (error: any) {
    console.error('❌ [Cloudinary Upload Exception]:', error?.message || error);
  }

  return null;
}
