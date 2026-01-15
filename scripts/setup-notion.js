const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;

// Database schema
const databaseSchema = {
  parent: {
    type: 'page_id',
    page_id: NOTION_PAGE_ID,
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
    Phase: {
      select: {
        options: [
          { name: 'Phase 1', color: 'green' },
          { name: 'Phase 2', color: 'blue' },
          { name: 'Phase 3', color: 'purple' },
        ],
      },
    },
    'Focus Area': {
      select: {
        options: [
          { name: 'Segmentation', color: 'orange' },
          { name: 'Targeting', color: 'pink' },
          { name: 'Positioning', color: 'yellow' },
          { name: 'Implementation', color: 'brown' },
        ],
      },
    },
    Status: {
      status: {
        options: [
          { name: 'Not Started', color: 'gray' },
          { name: 'In Progress', color: 'blue' },
          { name: 'Completed', color: 'green' },
          { name: 'Blocked', color: 'red' },
        ],
        groups: [
          { name: 'To do', option_ids: [] },
          { name: 'In progress', option_ids: [] },
          { name: 'Complete', option_ids: [] },
        ],
      },
    },
    Priority: {
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
    'Assigned To': {
      people: {},
    },
    Description: {
      rich_text: {},
    },
    'Success Metric': {
      rich_text: {},
    },
    Notes: {
      rich_text: {},
    },
  },
};

// All tasks from the roadmap
const tasks = [
  // Phase 1: Foundation (Months 1-3)
  {
    taskName: 'Develop 3 core service packages targeting R10K-R30K/month range',
    phase: 'Phase 1',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Create comprehensive service packages for Sweet Spot Segment',
    successMetric: '3 packages priced R10K-R30K/month documented and ready to sell',
  },
  {
    taskName: 'Build case studies with 5-7 pilot clients',
    phase: 'Phase 1',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Offer discounted rates to early clients in exchange for detailed testimonials',
    successMetric: '5-7 client testimonials and case studies completed',
  },
  {
    taskName: 'Create lead magnet: SME Marketing ROI Calculator',
    phase: 'Phase 1',
    focusArea: 'Implementation',
    priority: 'Medium',
    description: 'Build interactive calculator tool to attract potential clients',
    successMetric: 'Calculator built, functional, and live on website',
  },
  {
    taskName: 'Create lead magnet: AI Marketing Guide',
    phase: 'Phase 1',
    focusArea: 'Implementation',
    priority: 'Medium',
    description: 'Comprehensive PDF guide explaining AI-powered marketing for SMEs',
    successMetric: 'PDF guide created with 15-20 pages of valuable content',
  },
  {
    taskName: 'Launch LinkedIn presence + thought leadership content',
    phase: 'Phase 1',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Establish company LinkedIn page and content strategy',
    successMetric: 'Company page live + 10 thought leadership posts published',
  },
  {
    taskName: 'Partner with 2-3 SME associations',
    phase: 'Phase 1',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Establish partnerships with SMME and chambers of commerce',
    successMetric: '2-3 partnerships established with signed agreements',
  },
  {
    taskName: 'Set up referral program structure',
    phase: 'Phase 1',
    focusArea: 'Implementation',
    priority: 'Medium',
    description: 'Design and document referral incentive program',
    successMetric: 'Program structure documented with clear incentives',
  },
  {
    taskName: 'Phase 1 Milestone: 8-12 paying clients, R120K-R250K MRR',
    phase: 'Phase 1',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Overall Phase 1 success metric',
    successMetric: '8-12 paying clients generating R120K-R250K MRR',
  },
  
  // Phase 2: Expansion (Months 4-6)
  {
    taskName: 'Develop Digital Foundation Package for beginners (R5K-R10K/month)',
    phase: 'Phase 2',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Create entry-level package for Digital Beginners segment',
    successMetric: 'Package priced R5K-R10K/month documented and launched',
  },
  {
    taskName: 'Launch content marketing engine (blog, case studies, webinars)',
    phase: 'Phase 2',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Build sustainable content production and distribution system',
    successMetric: 'Blog live with 8+ posts, case study library, webinar schedule',
  },
  {
    taskName: 'Expand sales outreach: Email campaigns',
    phase: 'Phase 2',
    focusArea: 'Implementation',
    priority: 'Medium',
    description: 'Design and implement email marketing sequences',
    successMetric: 'Campaign sequences built with automation',
  },
  {
    taskName: 'Expand sales outreach: LinkedIn outbound',
    phase: 'Phase 2',
    focusArea: 'Implementation',
    priority: 'Medium',
    description: 'Systematic LinkedIn prospecting strategy',
    successMetric: '50+ targeted connections per month',
  },
  {
    taskName: 'Host monthly SME Marketing Masterclass webinar series',
    phase: 'Phase 2',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Educational webinar series for lead generation',
    successMetric: 'Webinar series scheduled with first 3 sessions completed',
  },
  {
    taskName: 'Develop partnerships with accountants, business consultants, banks',
    phase: 'Phase 2',
    focusArea: 'Implementation',
    priority: 'Medium',
    description: 'Build referral network with complementary professionals',
    successMetric: '5-8 partnerships across accountants, consultants, banks',
  },
  {
    taskName: 'Invest in marketing automation and CRM systems',
    phase: 'Phase 2',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Implement tools for scalable operations',
    successMetric: 'Marketing automation and CRM operational and integrated',
  },
  {
    taskName: 'Phase 2 Milestone: 20-30 total clients, R300K-R500K MRR',
    phase: 'Phase 2',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Overall Phase 2 success metric',
    successMetric: '20-30 total clients generating R300K-R500K MRR',
  },
  
  // Phase 3: Optimization (Months 7-12)
  {
    taskName: 'Analyze client data: identify most profitable segments/services',
    phase: 'Phase 3',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Data-driven analysis of what\'s working best',
    successMetric: 'Report on profitable segments with actionable insights',
  },
  {
    taskName: 'Develop industry-specific packages',
    phase: 'Phase 3',
    focusArea: 'Implementation',
    priority: 'Medium',
    description: 'Create vertical-specific offerings (e.g., Professional Services Marketing Suite)',
    successMetric: '2-3 vertical packages developed and launched',
  },
  {
    taskName: 'Create enterprise-lite offering for Corporate Spinout segment',
    phase: 'Phase 3',
    focusArea: 'Implementation',
    priority: 'Medium',
    description: 'Premium package for larger SMEs transitioning from corporate',
    successMetric: 'Corporate Spinout package created and marketed',
  },
  {
    taskName: 'Build strategic partnerships with complementary service providers',
    phase: 'Phase 3',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Partner with web developers, designers, strategists',
    successMetric: '3-5 complementary provider partnerships established',
  },
  {
    taskName: 'Develop AI-powered self-service tools for lower-tier clients',
    phase: 'Phase 3',
    focusArea: 'Implementation',
    priority: 'Medium',
    description: 'Build tools to serve Digital Beginners at scale',
    successMetric: 'Self-service tool launched for lower-tier segment',
  },
  {
    taskName: 'Launch client success program to reduce churn and drive upsells',
    phase: 'Phase 3',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Proactive client retention and expansion program',
    successMetric: 'Churn reduction plan implemented, <10% monthly churn',
  },
  {
    taskName: 'Phase 3 Milestone: 40-60 clients, R600K-R1M MRR, <10% churn',
    phase: 'Phase 3',
    focusArea: 'Implementation',
    priority: 'High',
    description: 'Overall Phase 3 success metric',
    successMetric: '40-60 clients, R600K-R1M MRR, <10% monthly churn',
  },
];

async function createDatabase() {
  try {
    console.log('🚀 Creating Notion database...');
    
    const database = await notion.databases.create(databaseSchema);
    
    console.log('✅ Database created successfully!');
    console.log('📊 Database ID:', database.id);
    console.log('🔗 Database URL:', database.url);
    
    // Save database ID to env file
    const fs = require('fs');
    const envPath = '.env.local';
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent += `\nNOTION_DATABASE_ID=${database.id}`;
    fs.writeFileSync(envPath, envContent);
    
    console.log('\n📝 Populating database with tasks...');
    
    // Add all tasks
    for (const task of tasks) {
      await notion.pages.create({
        parent: { database_id: database.id },
        properties: {
          'Task Name': {
            title: [
              {
                text: {
                  content: task.taskName,
                },
              },
            ],
          },
          Phase: {
            select: {
              name: task.phase,
            },
          },
          'Focus Area': {
            select: {
              name: task.focusArea,
            },
          },
          Status: {
            status: {
              name: 'Not Started',
            },
          },
          Priority: {
            select: {
              name: task.priority,
            },
          },
          Description: {
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
                  content: task.successMetric,
                },
              },
            ],
          },
        },
      });
      
      console.log(`  ✓ Added: ${task.taskName}`);
    }
    
    console.log(`\n🎉 Successfully created database with ${tasks.length} tasks!`);
    console.log('🔗 View your database:', database.url);
    
    return database;
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    if (error.code === 'object_not_found') {
      console.error('⚠️  Make sure you\'ve shared the page with your integration!');
      console.error('   Go to your Notion page and add "Maru STP Analysis" connection');
    }
    throw error;
  }
}

// Run the setup
createDatabase()
  .then(() => {
    console.log('\n✅ Setup complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  });
