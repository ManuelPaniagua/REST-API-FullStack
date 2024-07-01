import { Router } from 'express';
import {
    countTasks,
    createTask,
    deleteAllTasks,
    deleteTask,
    getTask,
    getTasks,
    updateTask,
} from '../controllers/tasks.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/task.schema.js';

const router = Router();

router.get('/task', authRequired, getTasks);
router.get('/task/count', authRequired, countTasks);
router.get('/task/:id', authRequired, getTask);
router.post(
    '/task',
    authRequired,
    validateSchema(createTaskSchema),
    createTask,
);
router.put('/task/:id', authRequired, updateTask);
router.delete('/task/:id', authRequired, deleteTask);
router.delete('/task/delete/all', authRequired, deleteAllTasks);

export default router;
