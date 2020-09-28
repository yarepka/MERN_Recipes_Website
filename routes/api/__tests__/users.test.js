const request = require('supertest');
const app = require('../../../app');

const defaultEmail = 'test@test.com';
const defaultName = 'Roman';
const defaultPassword = 'Roman123456';

function registerUser(name, email, password) {
  return request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send({
      name: name,
      email: email,
      password: password
    });
}

it('user trying to register without specifying name', async () => {
  const response = await registerUser(undefined, defaultEmail, defaultPassword);

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to register without specifying email', async () => {
  const response = await registerUser(defaultName, undefined, defaultPassword);
  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to register without specifying password', async () => {
  const response = await registerUser(defaultName, defaultEmail);
  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to register without specifying anything', async () => {
  const response = await registerUser();
  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(3);
})

it('user trying to register with an email which has been already registered', async () => {
  await global.signin();
  const response = await registerUser(defaultName, defaultEmail, defaultPassword);

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
})

it('user trying to register with password which do not contain numbers', async () => {
  const response = await registerUser(defaultName, defaultEmail, 'Romanroman');

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to register with password which do not conatin letters', async () => {
  const response = await registerUser(defaultName, defaultEmail, '1234567890');

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to register with password which do not contains atleast one uppercase letter', async () => {
  const response = await registerUser(defaultName, defaultEmail, 'roman123456');

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to register with password which do not contains atleast one lowercase letter', async () => {
  const response = await registerUser(defaultName, defaultEmail, 'ROMAN123456');

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to register with password which contains invalid characters', async () => {
  const response = await registerUser(defaultName, defaultEmail, '!@#$%^&*()_');

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to register with password witch length is less when 8', async () => {
  const response = await registerUser(defaultName, defaultEmail, 'Roman12');

  expect(response.status).toEqual(400);
  expect(response.body.errors.length).toEqual(1);
});

it('user trying to register with correct email, name, password specified', async () => {
  const response = await request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send({
      email: 'test@test.com',
      name: 'Roman',
      password: 'Roman123456'
    });

  expect(response.status).toEqual(201);
  expect(response.body.errors).toEqual(undefined);
});