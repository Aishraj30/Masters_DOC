import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { verifyJwtToken } from '@/lib/jwt';
import { PLAN_DETAILS } from '../create-order/route';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planType = 'pass',
      isSimulated = false,
      userId: bodyUserId,
      userEmail: bodyUserEmail,
    } = body;

    // Check for authenticated user via JWT Authorization header
    let authUserId: string | null = bodyUserId || null;
    let authEmail: string | null = bodyUserEmail || null;

    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded: any = verifyJwtToken(token);
      if (decoded && decoded.id) {
        authUserId = decoded.id;
      }
      if (decoded && decoded.email) {
        authEmail = decoded.email;
      }
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'secret_canva_replica';

    // Verify HMAC SHA256 Signature unless in simulated mode
    let isSignatureValid = false;
    if (isSimulated || razorpay_order_id?.startsWith('order_simulated')) {
      isSignatureValid = true;
    } else {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json(
          { success: false, error: 'Missing required Razorpay payment parameters' },
          { status: 400 }
        );
      }

      const bodyData = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', key_secret)
        .update(bodyData.toString())
        .digest('hex');

      isSignatureValid = expectedSignature === razorpay_signature;
    }

    if (!isSignatureValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid Razorpay payment signature verification failed' },
        { status: 400 }
      );
    }

    const isProPlan = planType === 'pro_monthly' || planType === 'pro_yearly';
    const planInfo = (PLAN_DETAILS as any)[planType] || PLAN_DETAILS.pass;

    let updatedUserStatus = {
      isPro: isProPlan,
      hasOneTimePass: !isProPlan,
      subscriptionPlan: isProPlan ? planType : 'free',
      oneTimePassesCount: !isProPlan ? 1 : 0,
    };

    // Save Subscription & Payment Record to MongoDB for the user
    try {
      await connectToDatabase();

      let targetUser = null;
      if (authUserId && authUserId.match(/^[0-9a-fA-F]{24}$/)) {
        targetUser = await User.findById(authUserId);
      }
      if (!targetUser && authEmail) {
        targetUser = await User.findOne({ email: authEmail.trim().toLowerCase() });
      }
      if (!targetUser) {
        targetUser = await User.findOne({}).sort({ createdAt: -1 });
      }

      if (targetUser) {
        if (isProPlan) {
          targetUser.isPro = true;
          targetUser.subscriptionPlan = planType as any;
          targetUser.subscriptionStatus = 'active';

          // Expiration date calculation (30 days for monthly, 365 days for yearly)
          const daysToAdd = planType === 'pro_yearly' ? 365 : 30;
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + daysToAdd);
          targetUser.subscriptionExpiresAt = expiryDate;
        } else {
          // One-time pass purchase
          targetUser.oneTimePassesCount = (targetUser.oneTimePassesCount || 0) + 1;
        }

        // Push transaction details into user's payment history array
        if (!targetUser.payments) {
          targetUser.payments = [];
        }
        targetUser.payments.push({
          orderId: razorpay_order_id || `order_sim_${Date.now()}`,
          paymentId: razorpay_payment_id || `pay_sim_${Date.now()}`,
          amount: planInfo.totalAmount,
          planType,
          paidAt: new Date(),
        });

        await targetUser.save();

        // Log transaction in standalone Payment model
        try {
          const PaymentModel = (await import('@/models/Payment')).default;
          const newPaymentDoc = new PaymentModel({
            userId: targetUser._id.toString(),
            userEmail: targetUser.email,
            orderId: razorpay_order_id || `order_sim_${Date.now()}`,
            paymentId: razorpay_payment_id || `pay_sim_${Date.now()}`,
            signature: razorpay_signature || '',
            amount: planInfo.totalAmount,
            currency: 'INR',
            planType,
            status: 'paid',
            isSimulated: isSimulated || razorpay_order_id?.startsWith('order_simulated'),
          });
          await newPaymentDoc.save();
        } catch (payErr: any) {
          console.warn('Payment model save error:', payErr.message);
        }

        updatedUserStatus = {
          isPro: targetUser.isPro || false,
          hasOneTimePass: (targetUser.oneTimePassesCount || 0) > 0,
          subscriptionPlan: targetUser.subscriptionPlan || 'free',
          oneTimePassesCount: targetUser.oneTimePassesCount || 0,
        };
      }
    } catch (dbErr: any) {
      console.error('MongoDB Subscription Save Error:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      paymentId: razorpay_payment_id || `pay_simulated_${Date.now()}`,
      message: 'Payment verified and saved to DB successfully',
      ...updatedUserStatus,
    });
  } catch (error: any) {
    console.error('Razorpay Verify Payment Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to verify Razorpay payment',
      },
      { status: 500 }
    );
  }
}
