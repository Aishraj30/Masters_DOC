import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Media from '@/models/Media';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, image, filename, source, mimeType, size } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    if (!image) {
      return NextResponse.json({ success: false, error: 'Image data is required' }, { status: 400 });
    }

    await connectToDatabase();

    // Try Cloudinary CDN upload first
    let finalUrl = image;
    let finalPublicId = '';

    const cloudinaryResult = await uploadToCloudinary(image);
    if (cloudinaryResult) {
      finalUrl = cloudinaryResult.url;
      finalPublicId = cloudinaryResult.publicId;
    }

    // Save media record to MongoDB
    const newMedia = await Media.create({
      userId,
      url: finalUrl,
      publicId: finalPublicId,
      filename: filename || (source === 'camera' ? 'Camera Photo' : 'Uploaded Image'),
      source: source || 'upload',
      mimeType: mimeType || 'image/png',
      size: size || 0,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        media: {
          id: newMedia._id.toString(),
          userId: newMedia.userId,
          url: newMedia.url,
          filename: newMedia.filename,
          source: newMedia.source,
          createdAt: newMedia.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ [Media Upload API Error]:', error?.message || error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to process media upload' },
      { status: 500 }
    );
  }
}
