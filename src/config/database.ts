import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` }); 

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});