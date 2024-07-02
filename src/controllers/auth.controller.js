import bcryptjs from 'bcryptjs';
import { v4 } from 'uuid';
import { getConnection } from '../database.js';
import { createAccessToken } from '../libs/jwt.js';
import logger from '../middlewares/logger.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if email already exists in database
        const db = getConnection();
        const existingUser = db.data.users.find((user) => user.email === email);
        if (existingUser) {
            return res.status(400).json(['Email already exists']);
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        // Create a new User object
        const newUser = new User(username, email, passwordHash);
        db.data.users.push(newUser);
        await db.write();

        // create acces token
        const token = await createAccessToken({ id: newUser.id });

        // save token in a cookie
        res.cookie('token', token);

        // Log successful registration
        logger.info(`User registered successfully: ${newUser.email}`);

        // we don't need sent password to the backend
        res.json({
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            createdAt: newUser.createdAt,
        });
    } catch (error) {
        logger.error('Error registering user:', error);

        return res.status(500).send(error);
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = getConnection();

        // Find user by email
        const userFound = await db.data.users.find(
            (user) => user.email === email,
        );

        if (!userFound) {
            return res
                .status(400)
                .json({ message: ' Invalid Email or Password' });
        }
        // compare passwords
        const isMatch = await bcryptjs.compare(password, userFound.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: ' Invalid Email or Password' });
        }

        // create acces token
        const token = await createAccessToken({ id: userFound.id });

        // Log successful login
        logger.info(`User logged in successfully: ${email}`);

        // save token in a cookie
        res.cookie('token', token);

        // we don't need sent password to the backend
        res.json({
            id: userFound.id,
            email: userFound.email,
            username: userFound.username,
        });
    } catch (error) {
        logger.error('Error logging in:', error);
        return res.status(500).send(error);
    }
};

// Logout
export const logout = (req, res) => {
    // reset token
    res.clearCookie('token');
    logger.info('User logged out successfully');
    return res.status(200).json({ message: 'Logout succesful' });
};

// profile
export const profile = async (req, res) => {
    try {
        const db = getConnection();
        const userId = req.user.id;
        const userFound = await db.data.users.find(
            (user) => user.id === userId,
        );

        if (!userFound) {
            logger.info(`Profile not found for user with ID ${userId}`);
            return res.status(400).json({ message: 'User not found' });
        }
        logger.info(
            `Profile accessed successfully for user ${userFound.email}`,
        );
        return res.json({
            id: userFound.id,
            email: userFound.email,
            username: userFound.username,
        });
    } catch (error) {
        logger.error('Error fetching profile:', error);
        return res.status(500).json({ message: 'server error' });
    }
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.send(false);
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const db = getConnection();
        const userFound = db.data.users.find((user) => user.id === decoded.id);

        if (!userFound) {
            logger.info('Token unauthorized');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        logger.info('User token  successfully');

        // Return user information if authentication is successful
        return res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        logger.info('Token unauthorized');
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
