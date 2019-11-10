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
  const UsersTable = `CREATE TABLE IF NOT EXISTS
  users(
    user_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    first_name CHARACTER VARYING(255) NOT NULL,
    last_name CHARACTER VARYING(255) NOT NULL, 
    email CHARACTER VARYING(255) NOT NULL UNIQUE,
    password CHARACTER VARYING(128) NOT NULL,
    gender CHARACTER VARYING(15) NOT NULL,
    job_role CHARACTER VARYING(255) NOT NULL,
    department CHARACTER VARYING(255) NOT NULL,
    address CHARACTER VARYING(255) NOT NULL 
    is_admin BOOLEAN FALSE;
  )`;
  pool.query(UsersTable).catch((err) => {
    console.log(err);
    pool.end();
  });

  const ArticlesTable = `CREATE TABLE IF NOT EXISTS
  article(
    article_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    title VARCHAR(128) NOT NULL,
    article VARCHAR(3000) NOT NULL,
    created_on VARCHAR(50) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
  )`;
  pool.query(ArticlesTable).catch((err) => {
    console.log(err);
    pool.end();
  });

  const ArticleCommentTable = `CREATE TABLE IF NOT EXISTS
  articleComment(
    commentId SERIAL PRIMARY KEY NOT NULL UNIQUE,
      comment VARCHAR(300) NOT NULL,
      created_on VARCHAR(50) NOT NULL,
      authorId INT NOT NULL,
      article_id INT NOT NULL,
      FOREIGN KEY(article_id) REFERENCES article(article_id) ON UPDATE CASCADE ON DELETE CASCADE,
  )`;
  pool.query(ArticleCommentTable).catch((err) => {
    console.log(err);
    pool.end();
  });

  const GifTable = `CREATE TABLE IF NOT EXISTS
  gif(
    gifId SERIAL PRIMARY KEY NOT NULL UNIQUE,
    image VARCHAR(500) NOT NULL,
    gifTitle VARCHAR(50) NOT NULL,
    gifAuthorId INT NOT NULL,
    gifCreatedOn VARCHAR(50) NOT NULL,
    FOREIGN KEY(gifAuthorId) REFERENCES users(authorId) ON DELETE CASCADE ON UPDATE CASCADE
  )`;
  pool.query(GifTable).catch((err) => {
    console.log(err);
    pool.end();
  });
};

module.exports = createTables;

require('make-runnable');
