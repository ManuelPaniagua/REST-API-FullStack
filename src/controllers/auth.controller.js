import { getConnection } from '../database.js';
import { v4 } from 'uuid';

export const registerUser = async (req, res) => {
  const newUser = {
    id: v4(),
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  };
  try {
    const db = getConnection();
    db.data.users.push(newUser);
    await db.write();
    console.log(newUser);
    res.json(newUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

//Login
export const login = (req, res) => {
  res.send('login');
};
