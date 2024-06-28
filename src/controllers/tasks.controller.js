import { v4 } from 'uuid';
import { getConnection } from '../database.js';
import logger from '../middlewares/logger.js';

export const getTasks = (req, res) => {
    try {
        const db = getConnection();
        res.json(db.data.tasks);
        logger.info('GET /task successful');
    } catch (error) {
        logger.error('GET /task failed', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const createTask = async (req, res) => {
    const newTask = {
        id: v4(),
        name: req.body.name,
        description: req.body.description,

        // ...req.body     //other option instead specify name and description
    };
    try {
        const db = getConnection();
        db.data.tasks.push(newTask);
        await db.write();
        console.log(newTask);
        res.json(newTask);
        logger.info('POST /task successful');
    } catch (error) {
        logger.error('POST /task failed', error);
        return res.status(500).send(error);
    }
};
export const getTask = (req, res) => {
    try {
        const taskFound = getConnection().data.tasks.find(
            (task) => task.id === req.params.id,
        );
        if (!taskFound) {
            return res.sendStatus(404);
        }
        res.json(taskFound);
        logger.info('GET /task by Id successful');
    } catch (error) {
        logger.error('GET /task by Id failed', error);
        return res.status(500).send(error);
    }
};
export const updateTask = async (req, res) => {
    try {
        const db = getConnection();
        const taskFound = getConnection().data.tasks.find(
            (task) => task.id === req.params.id,
        );
        if (!taskFound) {
            return res.sendStatus(404);
        }
        taskFound.name = req.body.name;
        taskFound.description = req.body.description;

        // map the object, if = id replace the taskFound otherwise keep the same
        db.data.tasks.map((task) =>
            task.id === req.params.id ? taskFound : task,
        );

        await db.write();

        res.json(taskFound);
        logger.info('PUT /task update successfull');
    } catch (error) {
        logger.error('PUT /task update failed', error);
        return res.status(500).send(error);
    }
};
export const deleteTask = async (req, res) => {
    try {
        const db = getConnection();
        const taskFound = getConnection().data.tasks.find(
            (task) => task.id === req.params.id,
        );
        if (!taskFound) {
            return res.sendStatus(404);
        }
        const newTasks = db.data.tasks.filter((t) => t.id !== req.params.id);
        db.data.tasks = newTasks;

        await db.write();
        res.json(taskFound);
        logger.info('DEL /delete task successfull');
    } catch (error) {
        logger.error('PUT /delete task failed', error);
        return res.status(500).send(error);
    }
};

export const countTasks = (req, res) => {
    const totalTasks = getConnection().data.tasks.length;
    res.json(totalTasks);
};
