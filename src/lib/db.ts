import { Pool } from 'pg';

// Use global to avoid connection leaks in Next.js dev mode
const globalForDb = global as unknown as { db?: Pool };

const db = globalForDb.db ?? new Pool({
  connectionString: process.env.POSTGREESQL_URI,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false,
});

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;

export default db;