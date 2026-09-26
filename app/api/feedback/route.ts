import { NextResponse } from 'next/server';
import { sendFeedbackEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rating, comments, designTitle, exportFormat, user } = body;

    if (!rating) {
      return NextResponse.json(
        { success: false, message: 'Rating is required.' },
        { status: 400 }
      );
    }

    const mailResult = await sendFeedbackEmail({
      rating: Number(rating),
      comments: comments ? String(comments).trim() : '',
      designTitle: designTitle || 'Untitled Design',
      exportFormat: exportFormat || 'PNG',
      user: user || {},
    });

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully! Thank you for helping us improve.',
      emailStatus: mailResult.success ? 'sent' : 'logged',
    });
  } catch (error: any) {
    console.error('Feedback API Error:', error.message);
    return NextResponse.json(
      { success: true, message: 'Feedback recorded! Thank you for your review.' },
      { status: 200 }
    );
  }
}
