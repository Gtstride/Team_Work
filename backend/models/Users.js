const { Pool } = require('pg');


const connectionString = 'postgresql://postgres:godstime@localhost:5433/team_work';

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => {
  console.log('connected to the Postgres Database successfully');
});

const createUserTables = () => {
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
        is_admin BOOLEAN NOT NULL
      )`;

  pool
    .query(Users)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

// export pool and createTables to be accessible from any where within the application
module.exports = {
  createUserTables,
};

require('make-runnable');
