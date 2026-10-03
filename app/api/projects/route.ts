import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Project from '@/models/Project';
import { verifyJwtToken } from '@/lib/jwt';

// Helper to extract authenticated user from Authorization header
function getAuthUserId(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  const decoded: any = verifyJwtToken(token);
  return decoded?.id || null;
}

// GET /api/projects - List all projects for authenticated user
export async function GET(request: NextRequest) {
  try {
    const userId = getAuthUserId(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Token required.' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const projects = await Project.find({ userId }).sort({ updatedAt: -1 });

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error: any) {
    console.error('Fetch Projects API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user design projects.' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Save or update a project
export async function POST(request: NextRequest) {
  try {
    const userId = getAuthUserId(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Token required to save design.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, title, canvasData, thumbnailUrl, pagesCount, isPublic } = body;

    if (!canvasData) {
      return NextResponse.json(
        { success: false, message: 'Canvas JSON data is required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    let project;
    if (id) {
      // Update existing project
      project = await Project.findOneAndUpdate(
        { _id: id, userId },
        {
          title: title || 'Untitled Design',
          canvasData,
          thumbnailUrl: thumbnailUrl || '',
          pagesCount: pagesCount || 1,
          isPublic: isPublic || false,
        },
        { new: true }
      );
    }

    if (!project) {
      // Create new project
      project = new Project({
        userId,
        title: title || 'Untitled Design',
        canvasData,
        thumbnailUrl: thumbnailUrl || '',
        pagesCount: pagesCount || 1,
        isPublic: isPublic || false,
      });
      await project.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Project saved successfully!',
      project,
    });
  } catch (error: any) {
    console.error('Save Project API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save design project.' },
      { status: 500 }
    );
  }
}
