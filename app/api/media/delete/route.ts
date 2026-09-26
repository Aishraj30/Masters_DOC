import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Media from '@/models/Media';

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Media ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const query: any = { _id: id };
    if (userId) {
      query.userId = userId;
    }

    const deleted = await Media.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Media item not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('❌ [Delete Media API Error]:', error?.message || error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete media item' },
      { status: 500 }
    );
  }
}
