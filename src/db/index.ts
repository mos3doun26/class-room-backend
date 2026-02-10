import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString, {
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
  max: 10, // connection pool size
  idle_timeout: 20,
});
export const db = drizzle(client, { schema });

export const closeConnection = async () => {
  await client.end();
};