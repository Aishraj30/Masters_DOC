import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Project from '@/models/Project';
import User from '@/models/User';

// GET /api/admin/projects - List saved canvas projects
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const projects = await Project.find().sort({ updatedAt: -1 });
    const userIds = [...new Set(projects.map((p) => p.userId))];

    const users = await User.find({ _id: { $in: userIds } }).select('email name');
    const userMap: Record<string, { email: string; name: string }> = {};
    users.forEach((u) => {
      userMap[u._id.toString()] = { email: u.email, name: u.name };
    });

    const enrichedProjects = projects.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      userId: p.userId,
      userEmail: userMap[p.userId]?.email || 'Unknown User',
      userName: userMap[p.userId]?.name || 'Community Creator',
      pagesCount: p.pagesCount || 1,
      thumbnailUrl: p.thumbnailUrl || '',
      isPublic: p.isPublic || false,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      projects: enrichedProjects,
    });
  } catch (error: any) {
    console.error('Fetch Admin Projects Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch canvas projects.' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/projects - Toggle public global template status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, isPublic } = body;

    if (!projectId) {
      return NextResponse.json({ success: false, message: 'Project ID is required.' }, { status: 400 });
    }

    await connectToDatabase();

    const updated = await Project.findByIdAndUpdate(
      projectId,
      { isPublic: Boolean(isPublic) },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Project not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Project "${updated.title}" template visibility updated.`,
      project: updated,
    });
  } catch (error: any) {
    console.error('Update Admin Project Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update project template status.' },
      { status: 500 }
    );
  }
}
