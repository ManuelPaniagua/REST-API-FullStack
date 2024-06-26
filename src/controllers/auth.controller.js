import { getConnection } from '../database.js';
import { v4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

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

    //create acces token
    const token = await createAccessToken({ id: newUser.id });

    //save token in a cookie
    res.cookie('token', token);

    //we don't need sent password to the backend
    res.json({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    });

    // console.log(newUser);

    // res.json(newUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

//Login
export const login = (req, res) => {
  res.send('login');
};
