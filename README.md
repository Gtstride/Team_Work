### **_Team_Work_**

Teamwork is an internal social network for employees of an organization. The goal of the application is to facilitate more interaction between colleagues and promote team bonding, in the work space.

# Way Farer

[![Build Status](https://travis-ci.org/Gtstride/Team_Work.svg?branch=develop)](https://travis-ci.org/Gtstride/Team_Work)

[![Coverage Status](https://coveralls.io/repos/github/Gtstride/Team_Work/badge.svg?branch=develop)](https://coveralls.io/github/Gtstride/Team_Work?branch=develop)

[![Maintainability]()]()

## Minimum Required Features

- Admin can create an employee user account **Admin create employee's user account**
- Admin/Employees can **sign up**
- Employees can create and share gifs with other colleagues. **create a gifs**
- Employees can write and/or share articles with colleagues on topics of interest to
  them **Write and share articles with colleagues**
- Employees can edit their articles **Employees can edit their article**
- Employees can delete their articles **Employees can delete their articles**
- Employees can delete their gifs post **Delete their gifs post**
- Employees can comment on their colleagues gif post**comment on their colleagues gif post**
- Employees can view all articles**view all articles** showing **the most recently posted articles first**
- Employees can view a specific article **dEmployees can view a specific article**

## Technologies

- Node JS
- Express
- Mocha & Chai
- Validator
- ESLint
- Cloudinary
- Babel
- Postgres
- Travis CI
- Code Climate & Coveralls

## Requirements and Installation

To install and run this project you would need to have listed stack installed:

- Node.js

- To run:

```sh
git clone <https://github.com/Gtstride/Team_Work.git>
cd team_work
npm install
npm run start
```

## Testing

```sh
npm test
```

## API-ENDPOINTS

- V1

`- POST /api/v1/auth/create Create employees' user's account`

`- POST /api/api/v1/auth/signin Admin/Employee can signin`

`- POST /api/v1/gifs Create a gif`

`- POST /api/v1/articles Create a articles`

`- PATCH /api/v1/articles/<:article_id> Edit an article`

`- DELETE /api/v1/articles/<:article_id> Delete their article`

`- DELETE /api/v1/gifs/<:gifId> Delete their gifs`

`- POST /api/v1/articles/<articleId>/comment Create a comment on an article`

`- POST /api/v1//gifs/<:gifId>/comment Create a comment on a gif`

`- GET /feed See all feed`

`- GET /articles/<:articleId> Get an article`

`- GET /gifs/<:gifId> Get a gif`

## Github Project Board

[https://github.com/Gtstride/Team_Work/projects](https://github.com/Gtstride/Team_Work/projects)

## API

The API is currently in version 1 (v1) and is hosted at

## API Documentation

## Author

Godstime .A.
