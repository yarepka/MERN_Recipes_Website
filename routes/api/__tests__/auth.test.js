const request = require('supertest');
const app = require('../../../app');

it('unauthorized user trying to get current user', async () => {
  const response = await request(app).get('/api/auth/').send({});

  expect(response.status).toEqual(401);
});

it('registered user trying to log in', async () => {
  // Register user
  const xAuthToken = await global.signin();
  const response = await request(app)
    .get('/api/auth/')
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(response.status).toEqual(200);
  expect(response.body.email).toEqual('test@test.com');
  expect(response.body.name).toEqual('test@test.com');
});

it('user trying to log in without specifying email', async () => {
  const response = await request(app)
    .post('/api/auth/')
    .set('Content-Type', 'application/json')
    .send({
      password: 'password',
    });

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to log in without specifying password', async () => {
  const response = await request(app)
    .post('/api/auth/')
    .set('Content-Type', 'application/json')
    .send({
      email: 'test@test.com',
    });

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to log in without specifying anyhting', async () => {
  const response = await request(app)
    .post('/api/auth/')
    .set('Content-Type', 'application/json')
    .send({});

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(2);
});

it('user trying to log in with an email which was not registered yet', async () => {
  const response = await request(app)
    .post('/api/auth/')
    .set('Content-Type', 'application/json')
    .send({
      email: 'donotexist@test.com',
      password: 'password',
    });

  expect(response.status).toEqual(404);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to log in specifying incorrect password', async () => {
  const xAuthToken = await global.signin();
  const response = await request(app)
    .post('/api/auth/')
    .set('Content-Type', 'application/json')
    .set('x-auth-token', xAuthToken)
    .send({
      email: 'test@test.com',
      password: 'wrongpassword',
    });

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to log in specifying correct credentials', async () => {
  const xAuthToken = await global.signin();
  const response = await request(app)
    .post('/api/auth/')
    .set('Content-Type', 'application/json')
    .set('x-auth-token', xAuthToken)
    .send({
      email: 'test@test.com',
      password: 'Roman123456',
    });

  expect(response.status).toEqual(200);
  expect(response.body.token).not.toEqual(undefined);
});
