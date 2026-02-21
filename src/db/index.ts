import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}

const connectionString = process.env.DATABASE_URL;
const client = neon(connectionString);
export const db = drizzle(client, { schema });