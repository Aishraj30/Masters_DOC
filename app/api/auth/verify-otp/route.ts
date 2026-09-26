import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import OTP from '@/models/OTP';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const cleanOtp = otp ? otp.trim() : '';

    if (!cleanEmail || !cleanOtp) {
      return NextResponse.json(
        { success: false, message: 'Email address and 6-digit verification code are required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find matching OTP record in MongoDB
    const otpRecord = await OTP.findOne({ email: cleanEmail, otp: cleanOtp });

    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired 6-digit verification code.' },
        { status: 400 }
      );
    }

    // Remove verified OTP record
    await OTP.deleteMany({ email: cleanEmail });

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully!',
    });
  } catch (error: any) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Verification failed.' },
      { status: 500 }
    );
  }
}
