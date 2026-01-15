# Notion Integration Template for Next.js

This folder contains reusable files for integrating Notion task tracking into any Next.js project.

## Quick Setup

### 1. Copy Files to Your New Project

```bash
# From your new project directory
cp -r /path/to/templates/notion-integration/* .
```

Or manually copy:
- `lib/notion.ts` → `lib/notion.ts`
- `app/api/tasks/route.ts` → `app/api/tasks/route.ts`
- `app/api/tasks/[id]/route.ts` → `app/api/tasks/[id]/route.ts`
- `components/TasksView.tsx` → `components/TasksView.tsx`
- `app/tasks/page.tsx` → `app/tasks/page.tsx`
- `scripts/notion-project-setup.ts` → `scripts/notion-project-setup.ts`

### 2. Add Environment Variables

Create/update `.env.local`:

```env
# Notion Integration
NOTION_API_KEY=your_notion_integration_token
NOTION_PAGE_ID=your_notion_page_id
# NOTION_DATABASE_ID will be set after running setup script
```

### 3. Install Dependencies

```bash
npm install dotenv
```

### 4. Run Project Setup Script

```bash
npx tsx scripts/notion-project-setup.ts
```

### 5. Update .env.local with Database ID

After the script runs, add the database ID to `.env.local`:

```env
NOTION_DATABASE_ID=<id-from-script-output>
```

## Files Included

| File | Purpose |
|------|---------|
| `lib/notion.ts` | Notion API client and helper functions |
| `app/api/tasks/route.ts` | List and create tasks API |
| `app/api/tasks/[id]/route.ts` | Single task CRUD API |
| `components/TasksView.tsx` | Beautiful task management UI |
| `app/tasks/page.tsx` | Tasks page route |
| `scripts/notion-project-setup.ts` | Database creation script |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks?phase=X` | Filter by phase |
| GET | `/api/tasks?status=X` | Filter by status |
| GET | `/api/tasks?priority=X` | Filter by priority |
| GET | `/api/tasks?stats=true` | Get task statistics |
| POST | `/api/tasks` | Create new task |
| GET | `/api/tasks/[id]` | Get single task |
| PATCH | `/api/tasks/[id]` | Update task |
| DELETE | `/api/tasks/[id]` | Delete (archive) task |

## Customizing Default Tasks

Edit `scripts/notion-project-setup.ts` and modify the `DEFAULT_PROJECT_TASKS` array to customize what tasks are created for new projects.

## Notion Setup Prerequisites

1. **Create a Notion Integration** at [notion.so/my-integrations](https://notion.so/my-integrations)
2. **Get your Integration Token** (starts with `ntn_` or `secret_`)
3. **Create a Notion Page** where databases will be created
4. **Add Integration to Page** via the page's "..." menu → Connections
