import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const pageId = process.env.NOTION_PAGE_ID!;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const tasks = [
  { name: 'Develop 3 core service packages', phase: 'Phase 1', priority: 'High', description: 'Design and price 3 core service packages (R10K-R30K/month)', metric: '3 packages priced R10K-R30K/month' },
  { name: 'Build case studies with 5-7 pilot clients', phase: 'Phase 1', priority: 'High', description: 'Gather and format testimonials and case studies from pilot clients.', metric: '5-7 client testimonials completed' },
  { name: 'Create lead magnet: SME Marketing ROI Calculator', phase: 'Phase 1', priority: 'Medium', description: 'Develop a tool for SMEs to calculate potential marketing ROI.', metric: 'Calculator built and functional' },
  { name: 'Create lead magnet: AI Marketing Guide', phase: 'Phase 1', priority: 'Medium', description: 'Write and design a PDF guide on AI marketing.', metric: 'PDF guide created' },
  { name: 'Launch LinkedIn presence', phase: 'Phase 1', priority: 'High', description: 'Set up company page and schedule initial 10 posts.', metric: 'Company page + 10 posts' },
  { name: 'Develop thought leadership content', phase: 'Phase 1', priority: 'Medium', description: 'Write 8-12 articles/posts on relevant topics.', metric: '8-12 articles/posts' },
  { name: 'Partner with SME associations', phase: 'Phase 1', priority: 'High', description: 'Establish partnerships with key SME associations.', metric: '2-3 partnerships established' },
  { name: 'Set up referral program', phase: 'Phase 1', priority: 'Medium', description: 'Document and launch the referral program structure.', metric: 'Program structure documented' },
  { name: 'Develop Digital Foundation Package', phase: 'Phase 2', priority: 'High', description: 'Create a lower-tier package (R5K-R10K/month).', metric: 'Package priced R5K-R10K/month' },
  { name: 'Launch content marketing engine', phase: 'Phase 2', priority: 'High', description: 'Start regular blog publishing and case study releases.', metric: 'Blog + case studies live' },
  { name: 'Expand sales outreach: Email campaigns', phase: 'Phase 2', priority: 'Medium', description: 'Build and run email campaign sequences.', metric: 'Campaign sequences built' },
  { name: 'Expand sales outreach: LinkedIn outbound', phase: 'Phase 2', priority: 'Medium', description: 'Conduct targeted LinkedIn outreach (50+ connections/month).', metric: '50+ targeted connections/month' },
  { name: 'Host monthly SME Marketing Masterclass', phase: 'Phase 2', priority: 'High', description: 'Schedule and host webinar series.', metric: 'Webinar series scheduled' },
  { name: 'Partner with accountants', phase: 'Phase 2', priority: 'Medium', description: 'Establish partnerships with accounting firms.', metric: '3-5 partnerships' },
  { name: 'Partner with business consultants', phase: 'Phase 2', priority: 'Medium', description: 'Establish partnerships with business consultants.', metric: '3-5 partnerships' },
  { name: 'Partner with banks', phase: 'Phase 2', priority: 'Low', description: 'Establish partnerships with banks.', metric: '1-2 partnerships' },
  { name: 'Invest in marketing automation', phase: 'Phase 2', priority: 'High', description: 'Implement marketing automation tools.', metric: 'System implemented' },
  { name: 'Invest in CRM systems', phase: 'Phase 2', priority: 'High', description: 'Set up and optimize CRM.', metric: 'CRM operational' },
  { name: 'Analyze client data', phase: 'Phase 3', priority: 'High', description: 'Analyze data to identify profitable segments.', metric: 'Report on profitable segments' },
  { name: 'Develop industry-specific packages', phase: 'Phase 3', priority: 'Medium', description: 'Create packages tailored to specific verticals.', metric: '2-3 vertical packages' },
  { name: 'Create enterprise-lite offering', phase: 'Phase 3', priority: 'Medium', description: 'Develop a corporate spinout package.', metric: 'Corporate Spinout package' },
  { name: 'Build strategic partnerships', phase: 'Phase 3', priority: 'High', description: 'Partner with complementary service providers.', metric: '3-5 complementary providers' },
  { name: 'Develop AI-powered self-service tools', phase: 'Phase 3', priority: 'Medium', description: 'Launch self-service AI tools for lower-tier clients.', metric: 'Tool launched for lower-tier' },
  { name: 'Launch client success program', phase: 'Phase 3', priority: 'High', description: 'Implement a program to reduce churn.', metric: 'Churn reduction plan' }
];

async function main() {
  try {
    console.log('🚀 Creating Notion database with explicit parent type...\n');
    
    // Use raw HTTP request to ensure exact format
    const createPayload = {
      parent: {
        type: 'page_id',
        page_id: pageId
      },
      title: [
        {
          type: 'text',
          text: { content: 'Maru STP Implementation Tasks' }
        }
      ],
      properties: {
        'Name': { title: {} },
        'Phase': {
          select: {
            options: [
              { name: 'Phase 1', color: 'red' },
              { name: 'Phase 2', color: 'yellow' },
              { name: 'Phase 3', color: 'green' }
            ]
          }
        },
        'Priority': {
          select: {
            options: [
              { name: 'High', color: 'red' },
              { name: 'Medium', color: 'yellow' },
              { name: 'Low', color: 'gray' }
            ]
          }
        },
        'Status': {
          select: {
            options: [
              { name: 'Not Started', color: 'gray' },
              { name: 'In Progress', color: 'blue' },
              { name: 'Completed', color: 'green' },
              { name: 'Blocked', color: 'red' }
            ]
          }
        },
        'Due Date': { date: {} },
        'Description': { rich_text: {} },
        'Metric': { rich_text: {} }
      }
    };
    
    console.log('📤 Sending create request...');
    console.log('   Parent page:', pageId);
    
    // Use fetch directly for more control
    const response = await fetch('https://api.notion.com/v1/databases', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify(createPayload)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error('❌ API Error:', result.message);
      console.error('   Code:', result.code);
      return;
    }
    
    console.log(`\n✅ Database created: ${result.id}`);
    console.log(`   URL: ${result.url}`);
    
    // Check properties
    console.log('\n🔍 Checking properties...');
    const props = Object.keys(result.properties || {});
    console.log(`   Properties: ${props.join(', ') || '(none)'}`);
    
    if (props.length < 2) {
      console.log('\n⚠️  Properties were not created. This is a Notion API issue.');
      console.log('   Possible causes:');
      console.log('   1. Integration lacks required permissions');
      console.log('   2. Workspace-level restrictions');
      console.log('   3. API version incompatibility');
      return;
    }
    
    // Add tasks
    console.log('\n📝 Adding tasks...\n');
    await sleep(2000);
    
    let success = 0;
    for (const task of tasks) {
      try {
        const pageResp = await fetch('https://api.notion.com/v1/pages', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28'
          },
          body: JSON.stringify({
            parent: { database_id: result.id },
            properties: {
              'Name': { title: [{ text: { content: task.name } }] },
              'Phase': { select: { name: task.phase } },
              'Priority': { select: { name: task.priority } },
              'Status': { select: { name: 'Not Started' } },
              'Description': { rich_text: [{ text: { content: task.description } }] },
              'Metric': { rich_text: [{ text: { content: task.metric } }] }
            }
          })
        });
        
        if (pageResp.ok) {
          console.log(`  ✅ ${task.name}`);
          success++;
        } else {
          const err = await pageResp.json();
          console.log(`  ❌ ${task.name}: ${err.message}`);
        }
        await sleep(350);
      } catch (e: any) {
        console.log(`  ❌ ${task.name}: ${e.message}`);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`🎉 Created ${success} of ${tasks.length} tasks`);
    console.log('='.repeat(60));
    console.log(`\n📌 NOTION_DATABASE_ID=${result.id}`);
    console.log(`🔗 ${result.url}`);

  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

main();
