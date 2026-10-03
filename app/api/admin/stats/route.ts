import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Payment from '@/models/Payment';
import Project from '@/models/Project';
import Diagram from '@/models/Diagram';
import Feedback from '@/models/Feedback';
import Media from '@/models/Media';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // 1. User metrics
    const totalUsers = await User.countDocuments();
    const activeProUsers = await User.countDocuments({
      $or: [{ isPro: true }, { subscriptionStatus: 'active' }],
    });

    const passUsers = await User.find({ oneTimePassesCount: { $gt: 0 } });
    const passesSoldFromUsers = passUsers.reduce(
      (sum, u) => sum + (u.oneTimePassesCount || 0),
      0
    );

    // 2. Financial Revenue calculation (including 18% GST)
    const paidPayments = await Payment.find({ status: 'paid' });
    let totalRevenue = paidPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

    // Also include payments stored inside user documents if standalone Payment count is zero/low
    const usersWithPayments = await User.find({ 'payments.0': { $exists: true } });
    usersWithPayments.forEach((u) => {
      (u.payments || []).forEach((p) => {
        if (p.amount) totalRevenue += p.amount;
      });
    });

    const passesSoldFromPayments = paidPayments.filter((p) => p.planType === 'pass').length;
    const passesSold = Math.max(passesSoldFromUsers, passesSoldFromPayments);

    // GST Breakdown (18%)
    // Gross Revenue = Net Base Revenue + 18% GST (Gross = Net * 1.18 => Net = Gross / 1.18)
    const netBaseRevenue = Math.round((totalRevenue / 1.18) * 100) / 100;
    const gst18Amount = Math.round((totalRevenue - netBaseRevenue) * 100) / 100;

    // 3. Canvas Projects metrics
    const totalSavedProjects = await Project.countDocuments();

    // 4. Line Diagrams metrics
    const pendingDiagrams = await Diagram.countDocuments({ status: 'pending' });
    const globalApprovedDiagrams = await Diagram.countDocuments({ status: 'approved' });

    // 5. User Feedback metrics
    const feedbacks = await Feedback.find();
    const feedbackCount = feedbacks.length;
    const totalRating = feedbacks.reduce((acc, f) => acc + (f.rating || 5), 0);
    const averageRating = feedbackCount > 0 ? (totalRating / feedbackCount).toFixed(1) : '5.0';

    // 6. Media / Storage metrics
    const mediaCount = await Media.countDocuments();
    const allMedia = await Media.find({}, 'size');
    const totalStorageBytes = allMedia.reduce((acc, m) => acc + (m.size || 0), 0);

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        activeProUsers,
        passesSold,
        totalSavedProjects,
        pendingDiagrams,
        globalApprovedDiagrams,
        totalRevenue,
        netBaseRevenue,
        gst18Amount,
        feedbackCount,
        averageRating: Number(averageRating),
        mediaCount,
        totalStorageBytes,
      },
    });
  } catch (error: any) {
    console.error('Fetch Admin Stats Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch admin stats.' },
      { status: 500 }
    );
  }
}
