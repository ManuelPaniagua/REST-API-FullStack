import { v4 as uuidv4 } from 'uuid';

class TaskSchema {
    constructor(name, description, user) {
        this.id = uuidv4();
        this.name = String(name);
        this.description = String(description);
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
        this.user = user;
    }
}

// export default TaskSchema;

class Task extends TaskSchema {}

export default Task;
