import { getConnection } from '../database.js';
import { v4 } from 'uuid';
import bcryptjs from 'bcryptjs';

export const registerUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    const newUser = {
      id: v4(),
      email: req.body.email,
      password: passwordHash,
      username: req.body.username,
    };
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
