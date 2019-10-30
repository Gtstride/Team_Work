import 'dotenv/config';

import { Pool } from 'pg';

const connectionString = process.env.DATABASE;
const pool = new Pool({
  connectionString,
});

export default pool;
