import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { signJwtToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, username, email, phoneNumber, password } = body;

    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const cleanUsername = username ? username.trim().toLowerCase() : '';
    const cleanName = name ? name.trim() : '';
    const cleanPhone = phoneNumber ? phoneNumber.trim() : '';

    // Validate mandatory fields
    if (!cleanEmail) {
      return NextResponse.json(
        { success: false, message: 'Email address is mandatory.' },
        { status: 400 }
      );
    }

    if (!cleanUsername) {
      return NextResponse.json(
        { success: false, message: 'Username is required.' },
        { status: 400 }
      );
    }

    if (!cleanPhone) {
      return NextResponse.json(
        { success: false, message: 'Phone number is required.' },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long.' },
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
          message: `Database Connection Failed: ${dbErr.message || 'SSL / Authentication Error'}. Please check your MongoDB username in .env.`,
        },
        { status: 500 }
      );
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: cleanEmail });
    if (existingEmail) {
      return NextResponse.json(
        { success: false, message: 'An account with this email already exists.' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username: cleanUsername });
    if (existingUsername) {
      return NextResponse.json(
        { success: false, message: 'This username is already taken. Please choose a different username.' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const displayName = cleanName || cleanUsername;
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanUsername)}`;

    // Save to MongoDB
    const newUser = new User({
      name: displayName,
      username: cleanUsername,
      email: cleanEmail,
      phoneNumber: cleanPhone,
      password: hashedPassword,
      avatarUrl,
      provider: 'password',
    });

    await newUser.save();

    const token = signJwtToken({
      id: newUser._id.toString(),
      email: newUser.email,
      username: newUser.username,
      name: newUser.name,
    });

    const userProfile = {
      id: newUser._id.toString(),
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      avatarUrl: newUser.avatarUrl,
      provider: newUser.provider,
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully!',
        token,
        user: userProfile,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error during registration.' },
      { status: 500 }
    );
  }
}
