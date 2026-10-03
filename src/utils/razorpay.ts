import { getToken, fetchCurrentUserApi } from './auth';

export interface RazorpayCheckoutOptions {
  planType: 'pass' | 'pro_monthly' | 'pro_yearly';
  userEmail?: string;
  userName?: string;
  userId?: string;
  onSuccess: (result: { isPro: boolean; hasOneTimePass: boolean; paymentId: string }) => void;
  onError: (error: string) => void;
}

/**
 * Dynamically loads the Razorpay checkout.js script into the document head.
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Initiates Razorpay Payment Checkout Flow.
 */
export const startRazorpayCheckout = async (options: RazorpayCheckoutOptions) => {
  try {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      options.onError('Failed to load Razorpay payment SDK. Please check your internet connection.');
      return;
    }

    const token = getToken();
    const reqHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      reqHeaders['Authorization'] = `Bearer ${token}`;
    }

    // 1. Create order on Next.js backend API
    const res = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: reqHeaders,
      body: JSON.stringify({
        planType: options.planType,
        userId: options.userId,
        userEmail: options.userEmail,
      }),
    });

    const orderData = await res.json();
    if (!orderData.success) {
      options.onError(orderData.error || 'Failed to initialize payment order');
      return;
    }

    // 2. Handle simulated test mode if API keys are dev placeholders
    if (orderData.isSimulated) {
      const verifyRes = await fetch('/api/razorpay/verify-payment', {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify({
          razorpay_order_id: orderData.orderId,
          planType: options.planType,
          isSimulated: true,
          userId: options.userId,
          userEmail: options.userEmail,
        }),
      });
      const verifyData = await verifyRes.json();
      if (verifyData.success) {
        if (verifyData.isPro) {
          localStorage.setItem('is_pro_user', 'true');
        }
        if (verifyData.hasOneTimePass) {
          localStorage.setItem('has_onetime_pass', 'true');
        }
        fetchCurrentUserApi().catch(() => {});

        options.onSuccess({
          isPro: verifyData.isPro,
          hasOneTimePass: verifyData.hasOneTimePass,
          paymentId: verifyData.paymentId,
        });
      } else {
        options.onError(verifyData.error || 'Payment verification failed');
      }
      return;
    }

    // 3. Configure Razorpay Checkout Modal
    const rzpOptions = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Research Radar',
      description:
        options.planType === 'pass'
          ? 'One-Time Pass (₹99 + 18% GST = ₹116.82)'
          : 'Pro Monthly Plan (₹499 + 18% GST = ₹588.82)',
      image: '/logo.png',
      order_id: orderData.orderId,
      prefill: {
        name: options.userName || 'User',
        email: options.userEmail || 'user@example.com',
      },
      theme: {
        color: '#8b3dff',
      },
      handler: async (response: any) => {
        try {
          // 4. Verify Payment Signature on Next.js backend API
          const verifyRes = await fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: reqHeaders,
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planType: options.planType,
              userId: options.userId,
              userEmail: options.userEmail,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            if (verifyData.isPro) {
              localStorage.setItem('is_pro_user', 'true');
            }
            if (verifyData.hasOneTimePass) {
              localStorage.setItem('has_onetime_pass', 'true');
            }
            fetchCurrentUserApi().catch(() => {});

            options.onSuccess({
              isPro: verifyData.isPro,
              hasOneTimePass: verifyData.hasOneTimePass,
              paymentId: verifyData.paymentId,
            });
          } else {
            options.onError(verifyData.error || 'Payment signature verification failed.');
          }
        } catch (err: any) {
          options.onError(err.message || 'Payment verification failed.');
        }
      },
      modal: {
        ondismiss: () => {
          options.onError('Payment window was closed.');
        },
      },
    };

    const rzp = new (window as any).Razorpay(rzpOptions);
    rzp.on('payment.failed', (response: any) => {
      options.onError(response.error.description || 'Payment transaction failed.');
    });
    rzp.open();
  } catch (err: any) {
    console.error('Razorpay Checkout Error:', err);
    options.onError(err.message || 'Payment processing encountered an error.');
  }
};
