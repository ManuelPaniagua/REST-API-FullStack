import request from 'supertest';
import { expect } from 'chai';
import { app } from '../app.js';
import { createConnection } from '../src/database.js';

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
