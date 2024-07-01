import { v4 as uuidv4 } from 'uuid';

//TODO: Test with createdAt and UpdatedAt

class TaskSchema {
    constructor(name, description) {
        this.id = uuidv4();
        this.name = String(name);
        this.description = String(description);
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }
}

// export default TaskSchema;

class Task extends TaskSchema {}

export default Task;
