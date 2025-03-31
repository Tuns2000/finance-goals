const request = require('supertest');
const app = require('../server');  // Экспортируем приложение из server.js

describe('Authentication', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
  });

  it('should login with correct credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();  // Проверяем, что вернулся токен
  });

  it('should return error for invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'john@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
