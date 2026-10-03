import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

// GET /api/admin/users - Search and list all registered users
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const role = searchParams.get('role') || 'all';

    await connectToDatabase();

    const filter: any = {};

    if (query.trim()) {
      const regex = new RegExp(query.trim(), 'i');
      filter.$or = [{ name: regex }, { email: regex }, { username: regex }, { phoneNumber: regex }];
    }

    if (role !== 'all') {
      filter.role = role;
    }

    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error: any) {
    console.error('Fetch Admin Users Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user directory.' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/users - Update user permissions, Pro status, passes, or role
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, action, value } = body;

    if (!userId || !action) {
      return NextResponse.json(
        { success: false, message: 'User ID and action are required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    }

    if (action === 'togglePro') {
      const isPro = value !== undefined ? Boolean(value) : !user.isPro;
      user.isPro = isPro;
      user.subscriptionPlan = isPro ? 'pro_monthly' : 'free';
      user.subscriptionStatus = isPro ? 'active' : 'inactive';
    } else if (action === 'setPasses') {
      user.oneTimePassesCount = Math.max(0, Number(value) || 0);
    } else if (action === 'setRole') {
      user.role = value === 'admin' ? 'admin' : 'user';
    } else {
      return NextResponse.json({ success: false, message: 'Invalid update action.' }, { status: 400 });
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: `User ${user.email} updated successfully.`,
      user,
    });
  } catch (error: any) {
    console.error('Update Admin User Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update user profile.' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users - Delete user account
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json({ success: false, message: 'User ID is required.' }, { status: 400 });
    }

    await connectToDatabase();

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return NextResponse.json({ success: false, message: 'User document not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `User account ${deletedUser.email} has been permanently deleted.`,
    });
  } catch (error: any) {
    console.error('Delete Admin User Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete user account.' },
      { status: 500 }
    );
  }
}
