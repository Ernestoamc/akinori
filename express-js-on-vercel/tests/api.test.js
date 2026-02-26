const request = require('supertest');

const app = require('../src/app');

describe('API smoke tests', () => {
  it('GET / should return backend active message', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        ok: true,
        message: 'Backend activo',
      }),
    );
  });

  it('GET /api/v1/health should return ok and timestamp', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.message).toBe('API funcionando');
    expect(typeof response.body.timestamp).toBe('string');
  });

  it('POST /api/v1/auth/login should fail without password', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        ok: false,
      }),
    );
  });

  it('POST /api/v1/auth/login should fail with invalid password', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ password: 'incorrect_password_12345' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        ok: false,
      }),
    );
  });

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminPassword) {
    it('POST /api/v1/auth/login should return token with valid password', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ password: adminPassword });

      expect(response.status).toBe(200);
      expect(response.body.ok).toBe(true);
      expect(typeof response.body.token).toBe('string');
      expect(response.body.token.length).toBeGreaterThan(20);
    });
  }
});
