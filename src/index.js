import express from 'express'
import taskRoutes from './routes/tasks.js'

import './database.js'

const app = express();
app.listen(3000);
app.use(taskRoutes)
console.log('Server is running on port http://localhost:3000');