import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressWinston from 'express-winston';
import logger from './middlewares/logger.js';
import morgan from 'morgan';
import taskRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.route.js';
import { createConnection } from './database.js';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import winston from 'winston';
import { httpLogger } from './middlewares/logger.js';

const app = express();

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load Swagger YAML file
const swaggerYAMLPath = join(__dirname, './api.yaml');
const swaggerDocument = YAML.load(swaggerYAMLPath);

// settings
// app.set("port", process.env.PORT || 3000);

// middlewares
app.use(cors()); //needed for http request
app.use(express.json()); //save the data in the req.body
app.use(cookieParser());
app.use(httpLogger);

app.use(
    expressWinston.logger({
        transports: logger.transports,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple(),
        ),
        meta: false,
        msg: 'HTTP {{req.method}} {{req.url}}',
        expressFormat: true,
        colorize: true,
        ignoreRoute: function (req, res) {
            return false;
        },
    }),
);

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
