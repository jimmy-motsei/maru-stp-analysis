import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function main() {
  // Check the most recently created database
  const databaseId = '905b9098-bca6-4a15-bb88-718cee50e95a';
  
  console.log('Fetching database info...\n');
  
  try {
    const db = await notion.databases.retrieve({ database_id: databaseId });
    
    console.log('Database Title:', (db as any).title?.[0]?.plain_text || 'No title');
    console.log('Database ID:', db.id);
    console.log('URL:', (db as any).url);
    console.log('\nProperties:');
    
    const properties = (db as any).properties;
    if (properties && Object.keys(properties).length > 0) {
      for (const [name, config] of Object.entries(properties)) {
        console.log(`  - "${name}": ${(config as any).type}`);
      }
    } else {
      console.log('  (No properties found)');
    }
    
    console.log('\nFull response:');
    console.log(JSON.stringify(db, null, 2));
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

main();
