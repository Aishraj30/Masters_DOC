import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { signJwtToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const inputClean = email ? email.trim().toLowerCase() : '';

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

    // Find user by email OR username match
    const user = await User.findOne({
      $or: [{ email: inputClean }, { username: inputClean }],
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials. User not found.' },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid email/username or password.' },
        { status: 400 }
      );
    }

    const token = signJwtToken({
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      name: user.name,
    });

    const userProfile = {
      id: user._id.toString(),
      name: user.name,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      avatarUrl: user.avatarUrl,
      provider: user.provider,
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
