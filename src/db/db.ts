// db.ts
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { AppEnvs } from '../../read-env'; // Adjust this import path

// Create a connection pool for better performance
const pool = mysql.createPool({
  uri: AppEnvs.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Initialize drizzle ORM with the connection pool
export const db = drizzle(pool);
