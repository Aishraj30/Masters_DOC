import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Pricing configuration with 18% GST (amounts in paise: ₹1 = 100 paise)
// Base Price + 18% GST = Final Total Amount
export const PLAN_DETAILS = {
  pass: {
    name: 'One-Time Clean Pass',
    basePrice: 99,
    gstAmount: 17.82, // 18% of ₹99
    totalAmount: 116.82,
    totalPaise: 11682,
  },
  pro_monthly: {
    name: 'Pro Monthly Plan',
    basePrice: 499,
    gstAmount: 89.82, // 18% of ₹499
    totalAmount: 588.82,
    totalPaise: 58882,
  },
  pro_yearly: {
    name: 'Pro Yearly Plan',
    basePrice: 3999,
    gstAmount: 719.82, // 18% of ₹3999
    totalAmount: 4718.82,
    totalPaise: 471882,
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planType = 'pass', userId, userEmail } = body;

    const plan = (PLAN_DETAILS as any)[planType] || PLAN_DETAILS.pass;

    // Get active Razorpay API Keys from env or default test keys
    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'rzp_test_canva_replica';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'secret_canva_replica';

    const amountInPaise = plan.totalPaise;
    const currency = 'INR';

    // If using Razorpay test placeholders, return a simulated order ID for instant dev testing
    if (key_id.startsWith('rzp_test_canva') || key_secret.startsWith('secret_canva')) {
      return NextResponse.json({
        success: true,
        orderId: `order_simulated_${Date.now()}`,
        amount: amountInPaise,
        currency,
        keyId: key_id,
        planDetails: plan,
        isSimulated: true,
      });
    }

    // Initialize official Razorpay instance
    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: amountInPaise,
      currency,
      receipt: `rcpt_${planType}_${Date.now()}`,
      notes: {
        userId: userId || 'guest',
        userEmail: userEmail || '',
        planType,
        basePrice: `₹${plan.basePrice}`,
        gst18: `₹${plan.gstAmount}`,
        totalWithGst: `₹${plan.totalAmount}`,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: key_id,
      planDetails: plan,
      isSimulated: false,
    });
  } catch (error: any) {
    console.error('Razorpay Create Order Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create Razorpay payment order',
      },
      { status: 500 }
    );
  }
}
