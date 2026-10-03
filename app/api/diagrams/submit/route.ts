import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Diagram from '@/models/Diagram';
import { verifyJwtToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      svgPath,
      strokeColor = '#00c4cc',
      strokeWidth = 2,
      sourcePhotoUrl = '',
      promptUsed = '',
      user,
    } = body;

    const cleanTitle = title ? title.trim() : '';

    if (!cleanTitle) {
      return NextResponse.json(
        { success: false, message: 'Line diagram title is mandatory.' },
        { status: 400 }
      );
    }

    if (!svgPath) {
      return NextResponse.json(
        { success: false, message: 'SVG vector path data is required.' },
        { status: 400 }
      );
    }

    // Try extracting creator from Authorization token header
    let creatorId = user?.id || 'guest';
    let creatorName = user?.name || user?.username || 'Community Member';
    let creatorEmail = user?.email || '';

    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded: any = verifyJwtToken(token);
      if (decoded) {
        if (decoded.id) creatorId = decoded.id;
        if (decoded.name) creatorName = decoded.name;
        if (decoded.email) creatorEmail = decoded.email;
      }
    }

    await connectToDatabase();

    // Enforce title uniqueness check in database
    const existing = await Diagram.findOne({
      title: cleanTitle.toLowerCase(),
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          isDuplicate: true,
          message: `A line diagram named "${cleanTitle}" already exists. Please enter a unique diagram title.`,
        },
        { status: 400 }
      );
    }

    // Save Diagram as Pending Admin Approval
    const newDiagram = new Diagram({
      title: cleanTitle,
      svgPath,
      strokeColor,
      strokeWidth,
      sourcePhotoUrl,
      promptUsed,
      creatorId,
      creatorName,
      creatorEmail,
      status: 'pending',
      isGlobal: false,
    });

    await newDiagram.save();

    return NextResponse.json({
      success: true,
      message: 'Diagram submitted successfully! Sent to Admin approval queue.',
      diagram: newDiagram,
    });
  } catch (error: any) {
    console.error('Submit Diagram Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to submit line diagram.' },
      { status: 500 }
    );
  }
}
