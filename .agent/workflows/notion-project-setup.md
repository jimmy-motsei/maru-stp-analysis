---
description: Set up Notion project tracking for a new Next.js project
---

# Notion Project Setup Workflow

This workflow creates a Notion database for tracking project tasks in any new Next.js project.

## Prerequisites

1. **Notion Integration** - You need an internal Notion integration
   - Go to: https://www.notion.so/my-integrations
   - Use your existing integration: `maru-stp-market-analysis`
   - Or create a new one

2. **Notion Page** - A page where the database will be created
   - The integration must be added to this page

## Steps

### 1. Copy the setup script to your new project

```bash
# From your new project directory
curl -o scripts/notion-project-setup.ts https://raw.githubusercontent.com/jimmy-motsei/maru-stp-analysis/main/scripts/notion-project-setup.ts
```

Or manually copy the file from:
`/Users/ramoloimotsei/.gemini/antigravity/scratch/maru-stp-analysis/scripts/notion-project-setup.ts`

### 2. Add environment variables to `.env.local`

```env
# Notion Integration
NOTION_API_KEY=your_notion_integration_token_here
NOTION_PAGE_ID=your_notion_page_id_here

# Optional: Override project name (defaults to folder name)
# PROJECT_NAME=My Custom Project Name
```

### 3. Install required dependencies

// turbo
```bash
npm install dotenv @notionhq/client
```

### 4. Run the setup script

// turbo
```bash
npx tsx scripts/notion-project-setup.ts
```

### 5. Update `.env.local` with the database ID

After the script runs, it will output a database ID. Add it to your `.env.local`:

```env
NOTION_DATABASE_ID=<the-id-from-the-script>
```

## What Gets Created

The script creates a Notion database with:

| Property | Type | Options |
|----------|------|---------|
| Name | Title | - |
| Phase | Select | Setup, Development, Testing, Launch |
| Priority | Select | High, Medium, Low |
| Status | Select | Not Started, In Progress, Completed, Blocked |
| Due Date | Date | - |
| Description | Rich Text | - |
| Metric | Rich Text | - |

### Default Tasks (18 total)

**Setup Phase:**
- Initialize project repository
- Configure environment variables
- Set up Notion integration
- Configure deployment pipeline

**Development Phase:**
- Design system & components
- Implement core pages
- Set up API routes
- Database integration
- Authentication setup

**Testing Phase:**
- Write unit tests
- Integration testing
- Cross-browser testing
- Mobile responsiveness

**Launch Phase:**
- Production environment setup
- Performance optimization
- SEO configuration
- Documentation
- Go live!

## Customizing Tasks

To add custom tasks for a specific project type, modify the `DEFAULT_PROJECT_TASKS` array in the script or create a variant script.

## API Routes (Optional)

If you want to sync tasks with your app, copy these files:

1. `lib/notion.ts` - Notion client and helpers
2. `app/api/tasks/route.ts` - List and create tasks
3. `app/api/tasks/[id]/route.ts` - Get, update, delete tasks

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks?phase=Setup` | Filter by phase |
| GET | `/api/tasks?status=In Progress` | Filter by status |
| GET | `/api/tasks?stats=true` | Get statistics |
| POST | `/api/tasks` | Create new task |
| GET | `/api/tasks/[id]` | Get single task |
| PATCH | `/api/tasks/[id]` | Update task |
| DELETE | `/api/tasks/[id]` | Delete task |
