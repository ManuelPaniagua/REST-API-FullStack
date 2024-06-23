import { v4 } from 'uuid';
import { getConnection } from '../database.js';

export const getTasks = (req, res) => {
    const db = getConnection()
    res.json(db.data.tasks)
    //other option
    //const tasks = getConnection().data.tasks
    //res.json(tasks)
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
    const taskFound = getConnection().data.tasks.find(task => task.id === req.params.id);
    if (!taskFound){
        return res.sendStatus(404);  
    } 
    res.json(taskFound);
}
export const updateTask = async (req, res) => {
    const db = getConnection();
    const taskFound = getConnection().data.tasks.find(task => task.id === req.params.id);
    if (!taskFound){
     return res.sendStatus(404);  
     }
    taskFound.name = req.body.name
    taskFound.description = req.body.description
     //map the object, if = id replace the taskFound otherwise keep the same
    db.data.tasks.map(task => task.id === req.params.id ? taskFound : task);

    await db.write()

    res.json(taskFound)
}
export const deleteTask = async (req, res) => {
   const db = getConnection();
   const taskFound = getConnection().data.tasks.find(task => task.id === req.params.id);
   if (!taskFound){
    return res.sendStatus(404);  
    }
    const newTasks = db.data.tasks.filter(t => t.id !== req.params.id)
    db.data.tasks = newTasks;

    await db.write()
    res.json(taskFound)
}
export const count = (req, res) => {
    res.send('count!')
}