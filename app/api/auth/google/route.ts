import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { signJwtToken } from '@/lib/jwt';

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const client = new OAuth2Client(googleClientId);

export async function POST(request: Request) {
  try {
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json(
        { success: false, message: 'Google credential token is missing.' },
        { status: 400 }
      );
    }

    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: googleClientId,
      });
      payload = ticket.getPayload();
    } catch (verifyErr) {
      console.error('Google token verification failed:', verifyErr);
      return NextResponse.json(
        { success: false, message: 'Google token authentication failed.' },
        { status: 401 }
      );
    }

    if (!payload || !payload.email) {
      return NextResponse.json(
        { success: false, message: 'Invalid Google account payload.' },
        { status: 400 }
      );
    }

    const { email, name, picture } = payload;
    const cleanEmail = email.toLowerCase();
    const defaultUsername = cleanEmail.split('@')[0] + '_' + Math.floor(Math.random() * 1000);

    await connectToDatabase();

    let user = await User.findOne({ email: cleanEmail });

    if (!user) {
      user = new User({
        name: name || cleanEmail.split('@')[0],
        username: defaultUsername,
        email: cleanEmail,
        phoneNumber: 'Not provided',
        password: `google_oauth_${Date.now()}_${Math.random()}`,
        avatarUrl: picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanEmail)}`,
        provider: 'google',
      });
      await user.save();
    } else {
      if (picture && (!user.avatarUrl || user.avatarUrl.includes('dicebear'))) {
        user.avatarUrl = picture;
        await user.save();
      }
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
      message: 'Logged in with Google successfully!',
      token,
      user: userProfile,
    });
  } catch (error: any) {
    console.error('Google Auth API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error during Google login.' },
      { status: 500 }
    );
  }
}
