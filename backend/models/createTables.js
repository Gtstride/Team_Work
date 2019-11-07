import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to the db');
});

const createTables = () => {
  const Users = `CREATE TABLE IF NOT EXISTS
  users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    first_name CHARACTER VARYING(255) NOT NULL,
    last_name CHARACTER VARYING(255) NOT NULL,
    email CHARACTER VARYING(255) NOT NULL,
    password CHARACTER VARYING(128) NOT NULL,
    gender CHARACTER VARYING(15) NOT NULL,
    job_role CHARACTER VARYING(255) NOT NULL,
    department CHARACTER VARYING(255) NOT NULL,
    address CHARACTER VARYING(255) NOT NULL 
    is_admin BOOLEAN FALSE;
  )`;
  pool.query(Users).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    pool.end();
  });
};

module.exports = createTables;

require('make-runnable');
