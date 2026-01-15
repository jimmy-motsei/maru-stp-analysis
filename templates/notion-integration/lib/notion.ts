/**
 * Notion API Client and Helper Functions
 * 
 * This module provides a centralized Notion client and helper functions
 * for interacting with Notion databases.
 */

// Types for Notion tasks
export interface NotionTask {
  id: string;
  name: string;
  phase: string;
  priority: string;
  status: string;
  dueDate: string | null;
  description: string;
  metric: string;
  createdTime: string;
  lastEditedTime: string;
  url: string;
}

export interface CreateTaskInput {
  name: string;
  phase?: string;
  priority?: string;
  status?: string;
  dueDate?: string;
  description?: string;
  metric?: string;
}

export interface UpdateTaskInput {
  name?: string;
  phase?: string;
  priority?: string;
  status?: string;
  dueDate?: string | null;
  description?: string;
  metric?: string;
}

// Notion API configuration
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_VERSION = '2022-06-28';

if (!NOTION_API_KEY) {
  console.warn('Warning: NOTION_API_KEY is not set');
}

if (!NOTION_DATABASE_ID) {
  console.warn('Warning: NOTION_DATABASE_ID is not set');
}

// Helper to make Notion API requests
async function notionFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Notion API error');
  }

  return data;
}

// Parse a Notion page into a Task object
function parseNotionPage(page: any): NotionTask {
  const props = page.properties;
  
  return {
    id: page.id,
    name: props.Name?.title?.[0]?.plain_text || '',
    phase: props.Phase?.select?.name || '',
    priority: props.Priority?.select?.name || '',
    status: props.Status?.select?.name || 'Not Started',
    dueDate: props['Due Date']?.date?.start || null,
    description: props.Description?.rich_text?.[0]?.plain_text || '',
    metric: props.Metric?.rich_text?.[0]?.plain_text || '',
    createdTime: page.created_time,
    lastEditedTime: page.last_edited_time,
    url: page.url,
  };
}

/**
 * Get all tasks from the Notion database
 */
export async function getAllTasks(filter?: {
  phase?: string;
  priority?: string;
  status?: string;
}): Promise<NotionTask[]> {
  const filterConditions: any[] = [];

  if (filter?.phase) {
    filterConditions.push({
      property: 'Phase',
      select: { equals: filter.phase }
    });
  }

  if (filter?.priority) {
    filterConditions.push({
      property: 'Priority',
      select: { equals: filter.priority }
    });
  }

  if (filter?.status) {
    filterConditions.push({
      property: 'Status',
      select: { equals: filter.status }
    });
  }

  const body: any = {};
  
  if (filterConditions.length > 0) {
    body.filter = filterConditions.length === 1 
      ? filterConditions[0]
      : { and: filterConditions };
  }

  // Sort by phase, then priority
  body.sorts = [
    { property: 'Phase', direction: 'ascending' },
    { property: 'Priority', direction: 'ascending' }
  ];

  const data = await notionFetch(`/databases/${NOTION_DATABASE_ID}/query`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return data.results.map(parseNotionPage);
}

/**
 * Get a single task by ID
 */
export async function getTask(taskId: string): Promise<NotionTask> {
  const data = await notionFetch(`/pages/${taskId}`);
  return parseNotionPage(data);
}

/**
 * Create a new task
 */
export async function createTask(input: CreateTaskInput): Promise<NotionTask> {
  const properties: any = {
    Name: {
      title: [{ text: { content: input.name } }]
    }
  };

  if (input.phase) {
    properties.Phase = { select: { name: input.phase } };
  }

  if (input.priority) {
    properties.Priority = { select: { name: input.priority } };
  }

  if (input.status) {
    properties.Status = { select: { name: input.status } };
  } else {
    properties.Status = { select: { name: 'Not Started' } };
  }

  if (input.dueDate) {
    properties['Due Date'] = { date: { start: input.dueDate } };
  }

  if (input.description) {
    properties.Description = {
      rich_text: [{ text: { content: input.description } }]
    };
  }

  if (input.metric) {
    properties.Metric = {
      rich_text: [{ text: { content: input.metric } }]
    };
  }

  const data = await notionFetch('/pages', {
    method: 'POST',
    body: JSON.stringify({
      parent: { database_id: NOTION_DATABASE_ID },
      properties
    }),
  });

  return parseNotionPage(data);
}

/**
 * Update an existing task
 */
export async function updateTask(taskId: string, input: UpdateTaskInput): Promise<NotionTask> {
  const properties: any = {};

  if (input.name !== undefined) {
    properties.Name = {
      title: [{ text: { content: input.name } }]
    };
  }

  if (input.phase !== undefined) {
    properties.Phase = { select: { name: input.phase } };
  }

  if (input.priority !== undefined) {
    properties.Priority = { select: { name: input.priority } };
  }

  if (input.status !== undefined) {
    properties.Status = { select: { name: input.status } };
  }

  if (input.dueDate !== undefined) {
    properties['Due Date'] = input.dueDate 
      ? { date: { start: input.dueDate } }
      : null;
  }

  if (input.description !== undefined) {
    properties.Description = {
      rich_text: [{ text: { content: input.description } }]
    };
  }

  if (input.metric !== undefined) {
    properties.Metric = {
      rich_text: [{ text: { content: input.metric } }]
    };
  }

  const data = await notionFetch(`/pages/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ properties }),
  });

  return parseNotionPage(data);
}

/**
 * Delete (archive) a task
 */
export async function deleteTask(taskId: string): Promise<void> {
  await notionFetch(`/pages/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ archived: true }),
  });
}

/**
 * Get task statistics
 */
export async function getTaskStats(): Promise<{
  total: number;
  byPhase: Record<string, number>;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
}> {
  const tasks = await getAllTasks();
  
  const stats = {
    total: tasks.length,
    byPhase: {} as Record<string, number>,
    byStatus: {} as Record<string, number>,
    byPriority: {} as Record<string, number>,
  };

  for (const task of tasks) {
    // Count by phase
    stats.byPhase[task.phase] = (stats.byPhase[task.phase] || 0) + 1;
    
    // Count by status
    stats.byStatus[task.status] = (stats.byStatus[task.status] || 0) + 1;
    
    // Count by priority
    stats.byPriority[task.priority] = (stats.byPriority[task.priority] || 0) + 1;
  }

  return stats;
}
