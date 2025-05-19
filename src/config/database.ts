import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();  

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'passwordTemporary',
  database: 'investment_wallet',
});