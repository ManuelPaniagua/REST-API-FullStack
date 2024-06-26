import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import morgan from "morgan";
import taskRoutes from './src/routes/tasks.js';
import authRoutes from './src/routes/auth.route.js';
import { createConnection } from './src/database.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load Swagger YAML file
const swaggerYAMLPath = join(__dirname, 'src/api.yaml');
const swaggerDocument = YAML.load(swaggerYAMLPath);

// settings
// app.set("port", process.env.PORT || 3000);

// middlewares
app.use(cors()); //needed for http request
app.use(express.json()); //save the data in the req.body
app.use(cookieParser());
// app.use(morgan("dev"));

// Serve Swagger documentation using Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Routes
app.use(taskRoutes);
app.use(authRoutes);

// Initialize the database before starting the server
createConnection().catch((err) =>
  console.error('Failed to initialize database:', err),
);

export { app };
