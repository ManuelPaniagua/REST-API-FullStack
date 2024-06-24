import express from 'express';

// import morgan from "morgan";
import taskRoutes from './src/routes/tasks.js';
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

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Tasks API",
//       version: "1.0.0",
//       description: "A simple express library API",
//     },
//     servers: [
//       {
//         url: "http://localhost:3000",
//       },
//     ],
//   },
//   apis: ["./src/routes/*.js"],
// };
// const specs = swaggerJsDoc(options);

// middlewares
app.use(express.json()); //save the data in the req.body
// app.use(morgan("dev"));
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
// Serve Swagger documentation using Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Routes
app.use(taskRoutes);

// Initialize the database before starting the server
createConnection().catch((err) =>
  console.error('Failed to initialize database:', err),
);

export { app };
