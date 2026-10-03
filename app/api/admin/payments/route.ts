import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Payment from '@/models/Payment';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Fetch standalone payments
    const payments = await Payment.find().sort({ createdAt: -1 });

    // Format transaction ledger with 18% GST breakdown
    const ledger: any[] = payments.map((p) => {
      const gross = p.amount || 0;
      const netBase = Math.round((gross / 1.18) * 100) / 100;
      const gst18 = Math.round((gross - netBase) * 100) / 100;

      return {
        id: p._id.toString(),
        orderId: p.orderId,
        paymentId: p.paymentId || 'N/A',
        userEmail: p.userEmail || 'guest@system.com',
        planType: p.planType,
        amount: gross,
        netBase,
        gst18,
        currency: p.currency || 'INR',
        status: p.status,
        isSimulated: p.isSimulated || false,
        createdAt: p.createdAt,
      };
    });

    // Also scan user embedded payment logs if any exist
    const users = await User.find({ 'payments.0': { $exists: true } });
    users.forEach((u) => {
      (u.payments || []).forEach((p, idx) => {
        const gross = p.amount || 0;
        const netBase = Math.round((gross / 1.18) * 100) / 100;
        const gst18 = Math.round((gross - netBase) * 100) / 100;

        ledger.push({
          id: `usr_${u._id}_${idx}`,
          orderId: p.orderId || `ORD_${Date.now()}_${idx}`,
          paymentId: p.paymentId || `PAY_${Date.now()}_${idx}`,
          userEmail: u.email,
          planType: (p.planType as any) || 'pro_monthly',
          amount: gross,
          netBase,
          gst18,
          currency: 'INR',
          status: 'paid',
          isSimulated: false,
          createdAt: p.paidAt || u.createdAt,
        });
      });
    });

    return NextResponse.json({
      success: true,
      ledger,
    });
  } catch (error: any) {
    console.error('Fetch Admin Payments Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch financial payment ledger.' },
      { status: 500 }
    );
  }
}
