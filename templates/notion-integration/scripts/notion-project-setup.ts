#!/usr/bin/env node

/**
 * 🚀 Notion Project Setup Script
 * 
 * This script creates a Notion database for tracking project tasks.
 * Copy this to any new Next.js project and run it to set up project tracking.
 * 
 * Usage:
 *   1. Copy this file to your project's scripts/ folder
 *   2. Set up your .env.local with NOTION_API_KEY and NOTION_PAGE_ID
 *   3. Run: npx tsx scripts/notion-project-setup.ts
 * 
 * Environment variables needed:
 *   - NOTION_API_KEY: Your Notion internal integration token
 *   - NOTION_PAGE_ID: The Notion page ID where the database will be created
 * 
 * Optional environment variables:
 *   - PROJECT_NAME: Name of the project (defaults to folder name)
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;
const PROJECT_NAME = process.env.PROJECT_NAME || path.basename(process.cwd());

// Validate environment
if (!NOTION_API_KEY) {
  console.error('❌ Error: NOTION_API_KEY is not set in .env.local');
  console.log('\nTo get your Notion API key:');
  console.log('1. Go to https://www.notion.so/my-integrations');
  console.log('2. Create a new integration');
  console.log('3. Copy the Internal Integration Token');
  process.exit(1);
}

if (!NOTION_PAGE_ID) {
  console.error('❌ Error: NOTION_PAGE_ID is not set in .env.local');
  console.log('\nTo get your Notion page ID:');
  console.log('1. Go to the Notion page where you want the database');
  console.log('2. Click "..." menu → "Copy link"');
  console.log('3. The page ID is the long string in the URL');
  console.log('\nExample: https://notion.so/My-Page-abc123def456');
  console.log('Page ID: abc123def456');
  process.exit(1);
}

// Default tasks for a new Next.js project
const DEFAULT_PROJECT_TASKS = [
  // Setup Phase
  { name: 'Initialize project repository', phase: 'Setup', priority: 'High', description: 'Set up Git repo, branch strategy, and initial commit', metric: 'Repo created with main branch' },
  { name: 'Configure environment variables', phase: 'Setup', priority: 'High', description: 'Set up .env.local and document required variables', metric: 'All env vars documented' },
  { name: 'Set up Notion integration', phase: 'Setup', priority: 'Medium', description: 'Create Notion database for project tracking', metric: 'Database linked to project' },
  { name: 'Configure deployment pipeline', phase: 'Setup', priority: 'High', description: 'Set up Vercel/Netlify deployment', metric: 'Auto-deploy on push to main' },
  
  // Development Phase
  { name: 'Design system & components', phase: 'Development', priority: 'High', description: 'Create base UI components and design tokens', metric: 'Component library complete' },
  { name: 'Implement core pages', phase: 'Development', priority: 'High', description: 'Build main application pages', metric: 'All core pages functional' },
  { name: 'Set up API routes', phase: 'Development', priority: 'High', description: 'Create backend API endpoints', metric: 'APIs documented and tested' },
  { name: 'Database integration', phase: 'Development', priority: 'Medium', description: 'Connect to database (if applicable)', metric: 'CRUD operations working' },
  { name: 'Authentication setup', phase: 'Development', priority: 'Medium', description: 'Implement auth (if applicable)', metric: 'Login/logout working' },
  
  // Testing Phase
  { name: 'Write unit tests', phase: 'Testing', priority: 'Medium', description: 'Test core functions and utilities', metric: '80% coverage target' },
  { name: 'Integration testing', phase: 'Testing', priority: 'Medium', description: 'Test API endpoints and data flow', metric: 'All endpoints tested' },
  { name: 'Cross-browser testing', phase: 'Testing', priority: 'Low', description: 'Test on Chrome, Firefox, Safari', metric: 'Works on all major browsers' },
  { name: 'Mobile responsiveness', phase: 'Testing', priority: 'High', description: 'Ensure mobile-friendly design', metric: 'Works on mobile devices' },
  
  // Launch Phase
  { name: 'Production environment setup', phase: 'Launch', priority: 'High', description: 'Configure production env vars and settings', metric: 'Production env ready' },
  { name: 'Performance optimization', phase: 'Launch', priority: 'Medium', description: 'Optimize bundle size and load times', metric: 'Lighthouse score > 90' },
  { name: 'SEO configuration', phase: 'Launch', priority: 'Medium', description: 'Add meta tags, sitemap, robots.txt', metric: 'SEO audit passed' },
  { name: 'Documentation', phase: 'Launch', priority: 'Medium', description: 'Write README and technical docs', metric: 'Docs complete' },
  { name: 'Go live!', phase: 'Launch', priority: 'High', description: 'Deploy to production', metric: 'App live and accessible' },
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface TaskTemplate {
  name: string;
  phase: string;
  priority: string;
  description: string;
  metric: string;
}

async function createNotionDatabase(
  projectName: string,
  tasks: TaskTemplate[]
): Promise<{ databaseId: string; url: string }> {
  
  console.log(`\n🚀 Creating Notion database for: ${projectName}\n`);
  
  // Get unique phases from tasks
  const phases = [...new Set(tasks.map(t => t.phase))];
  
  // Create database
  const createPayload = {
    parent: {
      type: 'page_id',
      page_id: NOTION_PAGE_ID
    },
    title: [
      {
        type: 'text',
        text: { content: `${projectName} - Build Plan` }
      }
    ],
    properties: {
      'Name': { title: {} },
      'Phase': {
        select: {
          options: phases.map((phase, index) => ({
            name: phase,
            color: ['red', 'orange', 'yellow', 'green', 'blue'][index % 5]
          }))
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
  
  console.log('📤 Creating database...');
  
  const createResponse = await fetch('https://api.notion.com/v1/databases', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify(createPayload)
  });
  
  const createResult = await createResponse.json();
  
  if (!createResponse.ok) {
    throw new Error(createResult.message || 'Failed to create database');
  }
  
  const databaseId = createResult.id;
  const url = createResult.url;
  
  console.log(`✅ Database created: ${databaseId}`);
  console.log(`   URL: ${url}\n`);
  
  // Wait for Notion to sync
  await sleep(2000);
  
  // Add tasks
  console.log('📝 Adding tasks...\n');
  
  let successCount = 0;
  
  for (const task of tasks) {
    try {
      const pageResponse = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_API_KEY}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28'
        },
        body: JSON.stringify({
          parent: { database_id: databaseId },
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
      
      if (pageResponse.ok) {
        console.log(`  ✅ ${task.name}`);
        successCount++;
      } else {
        const err = await pageResponse.json();
        console.log(`  ❌ ${task.name}: ${err.message}`);
      }
      
      await sleep(350); // Rate limiting
    } catch (e: any) {
      console.log(`  ❌ ${task.name}: ${e.message}`);
    }
  }
  
  return { databaseId, url };
}

async function main() {
  try {
    console.log('='.repeat(60));
    console.log('  🔧 Notion Project Setup');
    console.log('='.repeat(60));
    
    const { databaseId, url } = await createNotionDatabase(
      PROJECT_NAME,
      DEFAULT_PROJECT_TASKS
    );
    
    console.log('\n' + '='.repeat(60));
    console.log('  ✅ Setup Complete!');
    console.log('='.repeat(60));
    
    console.log(`\n📌 Add to your .env.local:\n`);
    console.log(`   NOTION_DATABASE_ID=${databaseId}`);
    
    console.log(`\n🔗 View your database:`);
    console.log(`   ${url}`);
    
    console.log('\n📋 Next steps:');
    console.log('   1. Open the database in Notion');
    console.log('   2. Add due dates to schedule your work');
    console.log('   3. Update task status as you progress');
    console.log('   4. Optionally convert Status to kanban view');
    
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
