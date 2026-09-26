import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import OTP from '@/models/OTP';
import { sendOtpEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const cleanEmail = email ? email.trim().toLowerCase() : '';

    if (!cleanEmail) {
      return NextResponse.json(
        { success: false, message: 'Email address is required.' },
        { status: 400 }
      );
    }

    try {
      await connectToDatabase();
    } catch (dbErr: any) {
      return NextResponse.json(
        { success: false, message: `Database Error: ${dbErr.message}` },
        { status: 500 }
      );
    }

    // Check if email already registered
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'An account with this email address already exists.' },
        { status: 400 }
      );
    }

    // Generate random 6-digit numeric OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete previous OTP records for this email
    await OTP.deleteMany({ email: cleanEmail });

    // Save new OTP record to MongoDB
    const otpRecord = new OTP({
      email: cleanEmail,
      otp: generatedOtp,
    });
    await otpRecord.save();

    // Send email via Nodemailer
    try {
      await sendOtpEmail(cleanEmail, generatedOtp);
    } catch (mailErr: any) {
      console.error('Mail error fallback:', mailErr.message);
      console.log(`🔑 [DEV FALLBACK OTP] Code for ${cleanEmail}: ${generatedOtp}`);
    }

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been sent to ${cleanEmail}.`,
    });
  } catch (error: any) {
    console.error('Send OTP Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to send verification code.' },
      { status: 500 }
    );
  }
}
