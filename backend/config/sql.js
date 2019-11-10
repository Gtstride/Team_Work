const queryUserByEmail = 'SELECT * FROM users where email = $1';
const createUser = 'INSERT INTO users (firstname, lastname, email, password, gender, jobrole, department, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 returning *';
const findUserById = 'SELECT * FROM users WHERE id = $1';


export default {
  queryUserByEmail,
  createUser,
  findUserById,
};
