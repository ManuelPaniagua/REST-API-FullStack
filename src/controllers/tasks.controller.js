import { v4 } from 'uuid';
import { getConnection } from '../database.js';

export const getTasks = (req, res) => {
    res.send('Hello World!')
}
export const createTask = async (req, res) => {
    const newTask = {
        id: v4(),
        name: req.body.name,
        description: req.body.description
        //...req.body     //other option instead specify name and description
    }
    try {
        const db = getConnection()
        db.data.tasks.push(newTask)
        await db.write();
        console.log(newTask)
        res.json(newTask)
    } catch (error) {
        return res.status(500).send(error);
    }
}
export const getTask = (req, res) => {
    res.send('By Id!')
}
export const updateTask = (req, res) => {
    res.send('Updating T!')
}
export const deleteTask = (req, res) => {
    res.send('Deleting T!')
}
export const count = (req, res) => {
    res.send('count!')
}