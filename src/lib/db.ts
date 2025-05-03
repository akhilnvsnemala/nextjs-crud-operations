// lib/db.ts i am drectly used the host details of mysql, try to use .env is the best practice of code maintance
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nextjs_test',
});

export default pool;
 