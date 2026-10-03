import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { verifyJwtToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authorization token required.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = verifyJwtToken(token);

    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token.' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found in database.' },
        { status: 404 }
      );
    }

    // Decrement pass count in MongoDB
    const currentPasses = user.oneTimePassesCount || 0;
    const newPassesCount = Math.max(0, currentPasses - 1);
    
    user.oneTimePassesCount = newPassesCount;
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'One-time download pass consumed successfully.',
      oneTimePassesCount: newPassesCount,
      hasOneTimePass: newPassesCount > 0,
      isPro: user.isPro || false,
    });
  } catch (error: any) {
    console.error('Consume Pass API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update pass count in database.' },
      { status: 500 }
    );
  }
}
