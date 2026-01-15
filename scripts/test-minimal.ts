import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const pageId = process.env.NOTION_PAGE_ID;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  try {
    console.log('🔬 Step 1: Creating minimal database (title property only)...\n');
    
    // Create with ONLY the title property - the most minimal possible
    const db = await notion.databases.create({
      parent: { page_id: pageId! },
      title: [{ text: { content: 'Maru STP Tasks - Test' } }],
      properties: {
        'Task': { title: {} }  // Just the title property
      }
    });
    
    console.log(`✅ Database created: ${db.id}`);
    console.log(`   URL: ${(db as any).url}`);
    
    // Check what was created
    console.log('\n🔍 Checking created properties...');
    await sleep(2000);
    
    const checkDb = await notion.databases.retrieve({ database_id: db.id });
    const props = Object.keys((checkDb as any).properties || {});
    console.log(`   Properties: ${props.length > 0 ? props.join(', ') : '(none)'}`);
    
    if (props.length === 0) {
      console.log('\n❌ PROBLEM: Properties not being created on database create.');
      console.log('   This suggests an API limitation or permission issue.');
      console.log('\n🔧 Trying to add properties via UPDATE...');
      
      const updated = await notion.databases.update({
        database_id: db.id,
        properties: {
          'Phase': {
            select: {
              options: [
                { name: 'Phase 1', color: 'red' },
                { name: 'Phase 2', color: 'yellow' },
                { name: 'Phase 3', color: 'green' },
              ]
            }
          }
        }
      });
      
      console.log('   Update response received');
      
      await sleep(2000);
      const checkDb2 = await notion.databases.retrieve({ database_id: db.id });
      const props2 = Object.keys((checkDb2 as any).properties || {});
      console.log(`   Properties after update: ${props2.length > 0 ? props2.join(', ') : '(none)'}`);
    }
    
    // Try adding a page with just title
    console.log('\n📝 Step 2: Trying to add a page with just the title...');
    
    try {
      const page = await notion.pages.create({
        parent: { database_id: db.id },
        properties: {
          'Task': {
            title: [{ text: { content: 'Test task' } }]
          }
        }
      });
      console.log(`   ✅ Page created: ${page.id}`);
    } catch (err: any) {
      console.log(`   ❌ Failed: ${err.message}`);
    }
    
    console.log('\n📌 Database ID:', db.id);
    console.log('🔗 Check in Notion:', (db as any).url);

  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    if (error.body) {
      console.error('Body:', error.body);
    }
  }
}

main();
