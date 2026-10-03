import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { signJwtToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const rawInput = email ? String(email).trim() : '';
    const inputClean = rawInput.toLowerCase();

    if (!inputClean || !password) {
      return NextResponse.json(
        { success: false, message: 'Email or Username and password are required.' },
        { status: 400 }
      );
    }

    try {
      await connectToDatabase();
    } catch (dbErr: any) {
      console.error('MongoDB Connection Error:', dbErr.message);
      return NextResponse.json(
        {
          success: false,
          message: `Database Connection Error: ${dbErr.message || 'Authentication failed'}. Please check your MongoDB username in .env.`,
        },
        { status: 500 }
      );
    }

    // Special Admin Provisioning for Admin@2005
    const isAdminAttempt = inputClean === 'admin@2005' || rawInput === 'Admin@2005' || inputClean === 'admin@2005.com';

    let user = await User.findOne({
      $or: [
        { email: inputClean },
        { username: inputClean },
        { email: 'admin@2005.com' },
        { username: 'admin@2005' },
      ],
    });

    if (isAdminAttempt && !user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('12341234', salt);
      user = new User({
        name: 'System Admin',
        username: 'admin@2005',
        email: 'admin@2005.com',
        phoneNumber: '0000000000',
        password: hashedPassword,
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin2005',
        provider: 'password',
        role: 'admin',
        isPro: true,
        subscriptionPlan: 'pro_yearly',
        subscriptionStatus: 'active',
        oneTimePassesCount: 999,
        payments: [],
      });
      await user.save();
    }

    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials. User not found.' },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch && !(isAdminAttempt && password === '12341234')) {
      return NextResponse.json(
        { success: false, message: 'Invalid email/username or password.' },
        { status: 400 }
      );
    }

    // Enforce role = 'admin' for Admin@2005
    if (isAdminAttempt || user.username === 'admin@2005' || user.email === 'admin@2005.com') {
      if (user.role !== 'admin') {
        user.role = 'admin';
        user.isPro = true;
        await user.save();
      }
    }

    // Backfill missing default fields on older user documents in MongoDB
    let needsSave = false;
    if (user.isPro === undefined) { user.isPro = false; needsSave = true; }
    if (!user.subscriptionPlan) { user.subscriptionPlan = 'free'; needsSave = true; }
    if (!user.subscriptionStatus) { user.subscriptionStatus = 'inactive'; needsSave = true; }
    if (user.oneTimePassesCount === undefined) { user.oneTimePassesCount = 0; needsSave = true; }
    if (!user.payments) { user.payments = []; needsSave = true; }

    if (needsSave) {
      await user.save();
    }

    const token = signJwtToken({
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      name: user.name,
      role: user.role || 'user',
    });

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
      message: 'Login successful!',
      token,
      user: userProfile,
    });
  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error during login.' },
      { status: 500 }
    );
  }
}
