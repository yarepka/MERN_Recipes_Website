const request = require('supertest');
const app = require('../../../app');

it('user trying to register without specifying name', async () => {
  const response = await request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send({
      email: 'test@test.com',
      password: 'password'
    });

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to register without specifying email', async () => {
  const response = await request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send({
      name: 'Roman',
      password: 'password',
    });
  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to register without specifying password', async () => {
  const response = await request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send({
      name: 'Roman',
      email: 'test@test.com'
    });
  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to register without specifying anything', async () => {
  const response = await request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send({
    });
  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(3);
})

it('user trying to register with an email which has been already registered', async () => {
  await global.signin();
  const response = await request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send({
      email: 'test@test.com',
      name: 'Roman',
      password: 'password'
    });

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
})

it('user trying to register with correct email, name, password specified', async () => {
  const response = await request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send({
      email: 'test@test.com',
      name: 'Roman',
      password: 'password'
    });

  expect(response.status).toEqual(201);
  expect(response.body.errors).toEqual(undefined);
});