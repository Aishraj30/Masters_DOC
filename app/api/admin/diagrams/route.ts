import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Diagram from '@/models/Diagram';

// GET /api/admin/diagrams - Fetch pending & moderated diagrams for Admin Approval Queue
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'pending';

    await connectToDatabase();

    const filter: any = {};
    if (status !== 'all') {
      filter.status = status;
    }

    const diagrams = await Diagram.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      diagrams,
    });
  } catch (error: any) {
    console.error('Fetch Admin Diagrams Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch admin moderation queue.' },
      { status: 500 }
    );
  }
}

// POST /api/admin/diagrams - Approve or Reject a Diagram
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { diagramId, action } = body; // action: 'approve' | 'reject'

    if (!diagramId || !action) {
      return NextResponse.json(
        { success: false, message: 'Diagram ID and action (approve/reject) are required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const isApprove = action === 'approve';
    const updatedDiagram = await Diagram.findByIdAndUpdate(
      diagramId,
      {
        status: isApprove ? 'approved' : 'rejected',
        isGlobal: isApprove,
      },
      { new: true }
    );

    if (!updatedDiagram) {
      return NextResponse.json(
        { success: false, message: 'Diagram submission not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Diagram "${updatedDiagram.title}" has been ${isApprove ? 'APPROVED and added to Global Library!' : 'REJECTED'}.`,
      diagram: updatedDiagram,
    });
  } catch (error: any) {
    console.error('Admin Moderation Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update diagram approval status.' },
      { status: 500 }
    );
  }
}
