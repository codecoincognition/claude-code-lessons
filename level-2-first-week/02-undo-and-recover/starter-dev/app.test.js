const request = require('supertest');
const app = require('./app');

const AUTH = { Authorization: 'Bearer valid-token' };

describe('GET /api/users', () => {
  test('returns all users when authenticated', async () => {
    const res = await request(app).get('/api/users').set(AUTH);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).not.toHaveProperty('email'); // email excluded from list
  });

  test('returns 401 without token', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(401);
  });
});

describe('GET /api/users/:id', () => {
  test('returns a single user', async () => {
    const res = await request(app).get('/api/users/1').set(AUTH);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Alice');
    expect(res.body.email).toBe('alice@example.com');
  });

  test('returns 404 for unknown user', async () => {
    const res = await request(app).get('/api/users/999').set(AUTH);
    expect(res.status).toBe(404);
  });
});

describe('POST /api/users', () => {
  test('creates a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .set(AUTH)
      .send({ name: 'Dave', email: 'dave@example.com' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Dave');
    expect(res.body.role).toBe('user');
  });

  test('rejects missing fields', async () => {
    const res = await request(app)
      .post('/api/users')
      .set(AUTH)
      .send({ name: 'Eve' });
    expect(res.status).toBe(400);
  });
});

describe('DELETE /api/users/:id', () => {
  test('deletes an existing user', async () => {
    const res = await request(app).delete('/api/users/2').set(AUTH);
    expect(res.status).toBe(200);
    expect(res.body.message).toContain('Bob');
  });
});
