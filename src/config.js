import dotenv from 'dotenv';

dotenv.config();

// Access the environment variables using destructuring
const { TOKEN_SECRET } = process.env;

export default TOKEN_SECRET;
