import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Media from '@/models/Media';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: true, media: [] });
    }

    await connectToDatabase();

    const mediaItems = await Media.find({ userId }).sort({ createdAt: -1 }).lean();

    const formattedMedia = mediaItems.map((item: any) => ({
      id: item._id.toString(),
      userId: item.userId,
      url: item.url,
      publicId: item.publicId,
      filename: item.filename,
      source: item.source,
      createdAt: item.createdAt,
    }));

    return NextResponse.json({
      success: true,
      media: formattedMedia,
    });
  } catch (error: any) {
    console.error('❌ [Fetch Media API Error]:', error?.message || error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch user media' },
      { status: 500 }
    );
  }
}
