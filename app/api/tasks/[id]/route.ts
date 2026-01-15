import { NextRequest, NextResponse } from 'next/server';
import { getTask, updateTask, deleteTask } from '@/lib/notion';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/tasks/[id]
 * 
 * Get a single task by ID
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const task = await getTask(id);

    return NextResponse.json({
      success: true,
      task,
    });
  } catch (error: any) {
    console.error('Error fetching task:', error);
    
    if (error.message.includes('Could not find')) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/tasks/[id]
 * 
 * Update an existing task
 * 
 * Body (all optional):
 * - name: string
 * - phase: string
 * - priority: string
 * - status: string
 * - dueDate: string | null
 * - description: string
 * - metric: string
 */
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate phase if provided
    const validPhases = ['Phase 1', 'Phase 2', 'Phase 3'];
    if (body.phase !== undefined && body.phase !== null && !validPhases.includes(body.phase)) {
      return NextResponse.json(
        { success: false, error: `Invalid phase. Must be one of: ${validPhases.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate priority if provided
    const validPriorities = ['High', 'Medium', 'Low'];
    if (body.priority !== undefined && body.priority !== null && !validPriorities.includes(body.priority)) {
      return NextResponse.json(
        { success: false, error: `Invalid priority. Must be one of: ${validPriorities.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate status if provided
    const validStatuses = ['Not Started', 'In Progress', 'Completed', 'Blocked'];
    if (body.status !== undefined && body.status !== null && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const task = await updateTask(id, {
      name: body.name,
      phase: body.phase,
      priority: body.priority,
      status: body.status,
      dueDate: body.dueDate,
      description: body.description,
      metric: body.metric,
    });

    return NextResponse.json({
      success: true,
      task,
    });
  } catch (error: any) {
    console.error('Error updating task:', error);

    if (error.message.includes('Could not find')) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tasks/[id]
 * 
 * Delete (archive) a task
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    await deleteTask(id);

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting task:', error);

    if (error.message.includes('Could not find')) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
