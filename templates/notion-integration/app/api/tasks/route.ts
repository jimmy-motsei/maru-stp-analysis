import { NextRequest, NextResponse } from 'next/server';
import { getAllTasks, createTask, getTaskStats } from '@/lib/notion';

/**
 * GET /api/tasks
 * 
 * Fetch all tasks from Notion database
 * 
 * Query params:
 * - phase: Filter by phase (Phase 1, Phase 2, Phase 3)
 * - priority: Filter by priority (High, Medium, Low)
 * - status: Filter by status (Not Started, In Progress, Completed, Blocked)
 * - stats: If 'true', return statistics instead of tasks
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Check if stats are requested
    if (searchParams.get('stats') === 'true') {
      const stats = await getTaskStats();
      return NextResponse.json(stats);
    }
    
    // Get filter params
    const filter = {
      phase: searchParams.get('phase') || undefined,
      priority: searchParams.get('priority') || undefined,
      status: searchParams.get('status') || undefined,
    };

    const tasks = await getAllTasks(filter);

    return NextResponse.json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks
 * 
 * Create a new task in Notion database
 * 
 * Body:
 * - name: string (required)
 * - phase: string (optional)
 * - priority: string (optional)
 * - status: string (optional)
 * - dueDate: string (optional, ISO date)
 * - description: string (optional)
 * - metric: string (optional)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required field
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Task name is required' },
        { status: 400 }
      );
    }

    // Validate phase if provided
    const validPhases = ['Phase 1', 'Phase 2', 'Phase 3'];
    if (body.phase && !validPhases.includes(body.phase)) {
      return NextResponse.json(
        { success: false, error: `Invalid phase. Must be one of: ${validPhases.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate priority if provided
    const validPriorities = ['High', 'Medium', 'Low'];
    if (body.priority && !validPriorities.includes(body.priority)) {
      return NextResponse.json(
        { success: false, error: `Invalid priority. Must be one of: ${validPriorities.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate status if provided
    const validStatuses = ['Not Started', 'In Progress', 'Completed', 'Blocked'];
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const task = await createTask({
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
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
