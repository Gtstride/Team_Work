import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// DATABASE_URL=postgres://{user}:{password}@{hostname}:{port}/{database-name}
const connectionString = 'postgresql://postgres:godstime@localhost:5433/team_work';

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => {
  console.log('connected to the Postgres Database successfully');
});

// export pool and createTables to be accessible from any where within the application
export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  secretOrKey: 'godstime',
  secretOrPrivateKey: 'godstime',
};

require('make-runnable');
