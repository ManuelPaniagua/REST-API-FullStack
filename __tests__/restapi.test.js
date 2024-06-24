import request from 'supertest';
import { expect } from 'chai';
import { app } from '../app.js';
import { createConnection } from '../src/database.js';
import { getConnection } from '../src/database.js';

describe('GET /task', () => {
  before(async () => {
    await createConnection();
  });

  it('should return a list of tasks', async () => {
    const res = await request(app).get('/task');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');

    if (res.body.length > 0) {
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0]).to.have.property('name');
      expect(res.body[0]).to.have.property('description');
    }
  });
});

describe('POST /task', () => {
  let taskId;

  before(async () => {
    await createConnection();
  });

  it('Should create a new task', async () => {
    const newTaskData = {
      name: 'Test Task',
      description: 'This is a test task',
    };

    const res = await request(app)
      .post('/task')
      .send(newTaskData)
      .set('Accept', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id');
    expect(res.body.name).to.equal(newTaskData.name);
    expect(res.body.description).to.equal(newTaskData.description);
  });
});

describe('GET /task/:id', () => {
  let taskId;

  before(async () => {
    await createConnection();

    // Create a new task to get its ID
    const newTaskData = {
      name: 'Test Task',
      description: 'This is a test task',
    };

    const res = await request(app)
      .post('/task')
      .send(newTaskData)
      .set('Accept', 'application/json');

    taskId = res.body.id;
  });

  it('should get a task by ID', async () => {
    const res = await request(app).get(`/task/${taskId}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id').equal(taskId);
    expect(res.body).to.have.property('name');
    expect(res.body).to.have.property('description');
  });

  it('should return 404 if task ID does not exist', async () => {
    const invalidTaskId = 'invalid_id';
    const res = await request(app).get(`/task/${invalidTaskId}`);
    expect(res.status).to.equal(404);
  });
});
describe('PUT /task/:id', () => {
  let taskId;

  before(async () => {
    await createConnection();

    const newTask = {
      name: 'Test Task',
      description: 'This is a test task',
    };

    const res = await request(app)
      .post('/task')
      .send(newTask)
      .set('Accept', 'application/json');

    taskId = res.body.id;
  });

  it('should update a task by ID', async () => {
    const updatedTask = {
      name: 'Updated Task Name',
      description: 'Updated task description',
    };

    const res = await request(app)
      .put(`/task/${taskId}`)
      .send(updatedTask)
      .set('Accept', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id').equal(taskId);
    expect(res.body.name).to.equal(updatedTask.name);
    expect(res.body.description).to.equal(updatedTask.description);
  });

  it('should return 404 if task ID does not exist', async () => {
    const invalidTaskId = 'invalid_id';
    const res = await request(app)
      .put(`/task/${invalidTaskId}`)
      .send({
        name: 'Updated Task Name',
        description: 'Updated task description',
      })
      .set('Accept', 'application/json');
    expect(res.status).to.equal(404);
  });
});
describe('DELETE /task/:id', () => {
  let taskId;

  before(async () => {
    await createConnection();

    const newTask = {
      name: 'Task to Delete',
      description: 'This task will be deleted',
    };

    const res = await request(app)
      .post('/task')
      .send(newTask)
      .set('Accept', 'application/json');

    taskId = res.body.id;
  });

  it('should delete a task by ID', async () => {
    const res = await request(app).delete(`/task/${taskId}`);
    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(taskId);
  });

  it('should return 404 if task ID does not exist', async () => {
    const invalidTaskId = 'invalid_id';
    const res = await request(app).delete(`/task/${invalidTaskId}`);
    expect(res.status).to.equal(404);
  });
});

describe('GET /task/count', () => {
  before(async () => {
    await createConnection();
  });

  it('should return the total count of tasks', async () => {
    const res = await request(app).get('/task/count');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.a('number');

    const db = getConnection();
    const totalTasks = db.data.tasks.length;

    expect(res.body).to.equal(totalTasks);
  });
});
