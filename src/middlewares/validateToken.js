import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res
            .status(401)
            .json({ message: 'No Token, authorization denied' });
    }

    try {
        const user = await jwt.verify(token, TOKEN_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid Token' });
    }
};
