import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { verifyJwtToken } from '@/lib/jwt';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Access denied. No token provided.' },
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

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 }
      );
    }

    const userProfile = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      provider: user.provider,
    };

    return NextResponse.json({
      success: true,
      user: userProfile,
    });
  } catch (error: any) {
    console.error('Me API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error fetching user.' },
      { status: 500 }
    );
  }
}
