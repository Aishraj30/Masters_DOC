import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Project from '@/models/Project';
import { verifyJwtToken } from '@/lib/jwt';

function getAuthUserId(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  const decoded: any = verifyJwtToken(token);
  return decoded?.id || null;
}

// GET /api/projects/[id] - Fetch single project by ID
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const projectId = params.id;
    const userId = getAuthUserId(request);

    await connectToDatabase();
    const project = await Project.findById(projectId);

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found.' },
        { status: 404 }
      );
    }

    // Allow viewing if public or if owner
    if (!project.isPublic && project.userId !== userId) {
      return NextResponse.json(
        { success: false, message: 'Access denied.' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error: any) {
    console.error('Fetch Single Project Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error fetching project.' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const projectId = params.id;
    const userId = getAuthUserId(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized.' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const deletedProject = await Project.findOneAndDelete({
      _id: projectId,
      userId,
    });

    if (!deletedProject) {
      return NextResponse.json(
        { success: false, message: 'Project not found or unauthorized.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error: any) {
    console.error('Delete Project Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete project.' },
      { status: 500 }
    );
  }
}
