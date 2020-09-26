const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

// to get rid of deprecation warning
mongoose.set('useCreateIndex', true);

global.signin = async (mail) => {
  const name = 'Roman';
  const email = mail || 'test@test.com';
  const password = 'password';

  // sign up
  const response = await request(app)
    .post('/api/users/')
    .send({
      name, email, password
    })
    .expect(201);

  // extract the jwt
  return response.body.token;
};

let mongo;
// will run before all tests execuret
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// will run before each of test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// will run after all tests complete
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
})