import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const pageId = process.env.NOTION_PAGE_ID;

if (!process.env.NOTION_API_KEY) {
  console.error('Error: NOTION_API_KEY is not defined in .env.local');
  process.exit(1);
}

if (!pageId) {
  console.error('Error: NOTION_PAGE_ID is not defined in .env.local');
  process.exit(1);
}

const tasks = [
  // Phase 1
  {
    name: 'Develop 3 core service packages',
    phase: 'Phase 1',
    focus: 'Implementation',
    priority: 'High',
    description: 'Design and price 3 core service packages (R10K-R30K/month)',
    metric: '3 packages priced R10K-R30K/month'
  },
  {
    name: 'Build case studies with 5-7 pilot clients',
    phase: 'Phase 1',
    focus: 'Implementation',
    priority: 'High',
    description: 'Gather and format testimonials and case studies from pilot clients.',
    metric: '5-7 client testimonials completed'
  },
  {
    name: 'Create lead magnet: SME Marketing ROI Calculator',
    phase: 'Phase 1',
    focus: 'Implementation',
    priority: 'Medium',
    description: 'Develop a tool for SMEs to calculate potential marketing ROI.',
    metric: 'Calculator built and functional'
  },
  {
    name: 'Create lead magnet: AI Marketing Guide',
    phase: 'Phase 1',
    focus: 'Implementation',
    priority: 'Medium',
    description: 'Write and design a PDF guide on AI marketing.',
    metric: 'PDF guide created'
  },
  {
    name: 'Launch LinkedIn presence',
    phase: 'Phase 1',
    focus: 'Implementation',
    priority: 'High',
    description: 'Set up company page and schedule initial 10 posts.',
    metric: 'Company page + 10 posts'
  },
  {
    name: 'Develop thought leadership content',
    phase: 'Phase 1',
    focus: 'Implementation',
    priority: 'Medium',
    description: 'Write 8-12 articles/posts on relevant topics.',
    metric: '8-12 articles/posts'
  },
  {
    name: 'Partner with SME associations',
    phase: 'Phase 1',
    focus: 'Implementation',
    priority: 'High',
    description: 'Establish partnerships with key SME associations.',
    metric: '2-3 partnerships established'
  },
  {
    name: 'Set up referral program',
    phase: 'Phase 1',
    focus: 'Implementation',
    priority: 'Medium',
    description: 'Document and launch the referral program structure.',
    metric: 'Program structure documented'
  },
  // Phase 2
  {
    name: 'Develop Digital Foundation Package',
    phase: 'Phase 2',
    focus: 'Implementation',
    priority: 'High',
    description: 'Create a lower-tier package (R5K-R10K/month).',
    metric: 'Package priced R5K-R10K/month'
  },
  {
    name: 'Launch content marketing engine',
    phase: 'Phase 2',
    focus: 'Implementation',
    priority: 'High',
    description: 'Start regular blog publishing and case study releases.',
    metric: 'Blog + case studies live'
  },
  {
    name: 'Expand sales outreach: Email campaigns',
    phase: 'Phase 2',
    focus: 'Implementation',
    priority: 'Medium',
    description: 'Build and run email campaign sequences.',
    metric: 'Campaign sequences built'
  },
  {
    name: 'Expand sales outreach: LinkedIn outbound',
    phase: 'Phase 2',
    focus: 'Implementation',
    priority: 'Medium',
    description: 'Conduct targeted LinkedIn outreach (50+ connections/month).',
    metric: '50+ targeted connections/month'
  },
  {
    name: 'Host monthly SME Marketing Masterclass',
    phase: 'Phase 2',
    focus: 'Implementation',
    priority: 'High',
    description: 'Schedule and host webinar series.',
    metric: 'Webinar series scheduled'
  },
  {
    name: 'Partner with accountants',
    phase: 'Phase 2',
    focus: 'Implementation',
    priority: 'Medium',
    description: 'Establish partnerships with accounting firms.',
    metric: '3-5 partnerships'
  },
  {
    name: 'Partner with business consultants',
    phase: 'Phase 2',
    focus: 'Implementation',
    priority: 'Medium',
    description: 'Establish partnerships with business consultants.',
    metric: '3-5 partnerships'
  },
  {
    name: 'Partner with banks',
    phase: 'Phase 2',
    focus: 'Implementation',
    priority: 'Low',
    description: 'Establish partnerships with banks.',
    metric: '1-2 partnerships'
  },
  {
    name: 'Invest in marketing automation',
    phase: 'Phase 2',
    focus: 'Implementation',
    priority: 'High',
    description: 'Implement marketing automation tools.',
    metric: 'System implemented'
  },
  {
    name: 'Invest in CRM systems',
    phase: 'Phase 2',
    focus: 'Implementation',
    priority: 'High',
    description: 'Set up and optimize CRM.',
    metric: 'CRM operational'
  },
  // Phase 3
  {
    name: 'Analyze client data',
    phase: 'Phase 3',
    focus: 'Implementation',
    priority: 'High',
    description: 'Analyze data to identify profitable segments.',
    metric: 'Report on profitable segments'
  },
  {
    name: 'Develop industry-specific packages',
    phase: 'Phase 3',
    focus: 'Implementation',
    priority: 'Medium',
    description: 'Create packages tailored to specific verticals.',
    metric: '2-3 vertical packages'
  },
  {
    name: 'Create enterprise-lite offering',
    phase: 'Phase 3',
    focus: 'Implementation',
    priority: 'Medium',
    description: 'Develop a corporate spinout package.',
    metric: 'Corporate Spinout package'
  },
  {
    name: 'Build strategic partnerships',
    phase: 'Phase 3',
    focus: 'Implementation',
    priority: 'High',
    description: 'Partner with complementary service providers.',
    metric: '3-5 complementary providers'
  },
  {
    name: 'Develop AI-powered self-service tools',
    phase: 'Phase 3',
    focus: 'Implementation',
    priority: 'Medium',
    description: 'Launch self-service AI tools for lower-tier clients.',
    metric: 'Tool launched for lower-tier'
  },
  {
    name: 'Launch client success program',
    phase: 'Phase 3',
    focus: 'Implementation',
    priority: 'High',
    description: 'Implement a program to reduce churn.',
    metric: 'Churn reduction plan'
  }
];

async function main() {
  try {
    console.log('Creating Notion database...');
    // Create the database
    const database = await notion.databases.create({
      parent: {
        type: 'page_id',
        page_id: pageId!,
      },
      title: [
        {
          type: 'text',
          text: {
            content: 'Maru STP Implementation Tasks',
          },
        },
      ],
      properties: {
        'Task Name': {
          title: {},
        },
        'Phase': {
          select: {
            options: [
              { name: 'Phase 1', color: 'red' },
              { name: 'Phase 2', color: 'yellow' },
              { name: 'Phase 3', color: 'green' },
            ],
          },
        },
        'Focus Area': {
          select: {
            options: [
              { name: 'Segmentation', color: 'blue' },
              { name: 'Targeting', color: 'purple' },
              { name: 'Positioning', color: 'pink' },
              { name: 'Implementation', color: 'orange' },
            ],
          },
        },
        'Status': {
          status: {
            options: [
              { name: 'Not Started', color: 'gray' },
              { name: 'In Progress', color: 'blue' },
              { name: 'Completed', color: 'green' },
              { name: 'Blocked', color: 'red' },
            ]
          },
        },
        'Priority': {
          select: {
            options: [
              { name: 'High', color: 'red' },
              { name: 'Medium', color: 'yellow' },
              { name: 'Low', color: 'gray' },
            ],
          },
        },
        'Due Date': {
          date: {},
        },
        'Description': {
          rich_text: {},
        },
        'Success Metric': {
          rich_text: {},
        },
        // We can add Dependencies as a relation to itself, but it needs the DB ID which we are creating. 
        // Notion API might allow it if we update it later, or maybe we just skip it for now.
      },
    });

    console.log(`Database created with ID: ${database.id}`);

    // Populate the database
    console.log('Populating database with tasks...');
    
    for (const task of tasks) {
      await notion.pages.create({
        parent: {
          database_id: database.id,
        },
        properties: {
          'Task Name': {
            title: [
              {
                text: {
                  content: task.name,
                },
              },
            ],
          },
          'Phase': {
            select: {
              name: task.phase,
            },
          },
          'Focus Area': {
            select: {
              name: task.focus,
            },
          },
          'Priority': {
            select: {
              name: task.priority,
            },
          },
          'Description': {
            rich_text: [
              {
                text: {
                  content: task.description,
                },
              },
            ],
          },
          'Success Metric': {
            rich_text: [
              {
                text: {
                  content: task.metric,
                },
              },
            ],
          },
          'Status': {
             status: {
                name: 'Not Started'
             }
          }
        },
      });
      console.log(`Created task: ${task.name}`);
    }

    console.log('All tasks created successfully!');
    
    // Save DB ID back to .env.local potentially? Or just log it.
    // The user might need it for the app.
    console.log(`\nIMPORTANT: Add this to your .env.local:\nNOTION_DATABASE_ID=${database.id}`);

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
