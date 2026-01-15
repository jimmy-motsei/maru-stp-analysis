import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function main() {
  try {
    console.log('Fetching database properties...');
    const database = await notion.databases.retrieve({
      database_id: databaseId!
    });
    
    console.log('\nDatabase:', database);
    console.log('\nProperties:');
    for (const [key, value] of Object.entries((database as any).properties)) {
      console.log(`  - "${key}": ${(value as any).type}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
