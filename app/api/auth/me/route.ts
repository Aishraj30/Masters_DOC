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

    // Backfill missing default subscription fields on older user documents in MongoDB
    let needsSave = false;
    if (user.isPro === undefined) { user.isPro = false; needsSave = true; }
    if (!user.subscriptionPlan) { user.subscriptionPlan = 'free'; needsSave = true; }
    if (!user.subscriptionStatus) { user.subscriptionStatus = 'inactive'; needsSave = true; }
    if (user.oneTimePassesCount === undefined) { user.oneTimePassesCount = 0; needsSave = true; }
    if (!user.payments) { user.payments = []; needsSave = true; }

    if (needsSave) {
      await user.save();
    }

    const userProfile = {
      id: user._id.toString(),
      name: user.name,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      avatarUrl: user.avatarUrl,
      provider: user.provider,
      role: user.role || 'user',
      isPro: user.isPro || false,
      subscriptionPlan: user.subscriptionPlan || 'free',
      subscriptionStatus: user.subscriptionStatus || 'inactive',
      oneTimePassesCount: user.oneTimePassesCount || 0,
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
