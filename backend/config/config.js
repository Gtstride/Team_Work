import 'dotenv/config';

const Pool = require('pg');

const connectionString = process.env.DATABASE;
const pool = new Pool({
  connectionString,
});

export default pool;
