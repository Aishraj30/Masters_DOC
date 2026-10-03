import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Diagram from '@/models/Diagram';

// GET /api/diagrams/global - Fetch all Admin-Approved Global Diagrams for Public Library
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';

    await connectToDatabase();

    const filter: any = {
      status: 'approved',
      isGlobal: true,
    };

    if (query.trim()) {
      filter.title = { $regex: query.trim(), $options: 'i' };
    }

    const diagrams = await Diagram.find(filter).sort({ createdAt: -1 }).limit(100);

    return NextResponse.json({
      success: true,
      diagrams,
    });
  } catch (error: any) {
    console.error('Fetch Global Diagrams Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch global diagrams library.' },
      { status: 500 }
    );
  }
}
