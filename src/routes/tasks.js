import {Router} from 'express';
import { count, createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/tasks.controller.js'; 
const router = Router();

router.get('/task',getTasks);
router.get('/task/count',count);
router.get('/task/:id',getTask);
router.post('/task',createTask);
router.put('/task/:id',updateTask);
router.delete('/task/:id',deleteTask);

export default router