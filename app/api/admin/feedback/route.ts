import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Feedback from '@/models/Feedback';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      feedbacks,
    });
  } catch (error: any) {
    console.error('Fetch Admin Feedback Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user feedback records.' },
      { status: 500 }
    );
  }
}
