import { Router } from 'express';
import {
    countTasks,
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask,
} from '../controllers/tasks.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/task', authRequired, getTasks);
router.get('/task/count', authRequired, countTasks);
router.get('/task/:id', authRequired, getTask);
router.post('/task', authRequired, createTask);
router.put('/task/:id', authRequired, updateTask);
router.delete('/task/:id', authRequired, deleteTask);

export default router;
