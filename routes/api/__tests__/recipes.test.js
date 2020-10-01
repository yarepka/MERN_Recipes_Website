const request = require('supertest');
const app = require('../../../app');
const mongoose = require('mongoose');

async function createRecipe(xAuthToken) {
  // Get current user
  const currentUserResponse = await request(app)
    .get('/api/auth/')
    .set('x-auth-token', xAuthToken)
    .send({});

  const user = currentUserResponse.body;

  expect(currentUserResponse.status).toEqual(200);

  // Create recipe
  const newRecipe = {
    _id: mongoose.Types.ObjectId().toHexString(),
    title: 'Fry Potatoes',
    description: 'Tasy fry potatoes with butter and milk',
    ingredients: 'Potatoes\nButter\nMilkSaltPepper',
    directions: 'Cook Potatoes\nPut Butter & Milk\nAdd sald & pepper',
    prepTime: 20,
    cookTime: 60,
    numberOfServings: 2,
    likes: [],
    dislikes: [],
    comments: [],
    user: user.id,
  };

  const recipeResponse = await request(app)
    .post('/api/recipes/')
    .set('Content-Type', 'application/json')
    .set('x-auth-token', xAuthToken)
    .send(newRecipe);

  expect(recipeResponse.status).toEqual(201);

  const recipe = recipeResponse.body;

  return { xAuthToken, recipe };
}

it('unauthorized user trying to create new recipe', async () => {
  // Create recipe
  const newRecipe = {
    _id: mongoose.Types.ObjectId().toHexString(),
    title: 'Fry Potatoes',
    description: 'Tasy fry potatoes with butter and milk',
    ingredients: 'Potatoes\nButter\nMilkSaltPepper',
    directions: 'Cook Potatoes\nPut Butter & Milk\nAdd sald & pepper',
    prepTime: 20,
    cookTime: 60,
    numberOfServings: 2,
    likes: [],
    dislikes: [],
    comments: [],
    user: mongoose.Types.ObjectId().toHexString(),
  };

  const recipeResponse = await request(app)
    .post('/api/recipes/')
    .set('Content-Type', 'application/json')
    .send(newRecipe);

  expect(recipeResponse.status).toEqual(401);
});

it('authorized user trying to create new recipe, all properties specified', async () => {
  // Create user
  const xAuthToken = await global.signin();

  const { recipe } = await createRecipe(xAuthToken);
  expect(xAuthToken).not.toEqual(undefined);
  expect(recipe).not.toEqual(undefined);
});

it('authorized user trying to create new recipe without specifing any properties', async () => {
  const xAuthToken = await global.signin();
  const recipeResponse = await request(app)
    .post('/api/recipes/')
    .set('Content-Type', 'application/json')
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(400);
  expect(recipeResponse.body.errors.length).toEqual(11);
});

it('authorized user creates 5 recipies and then trying to fetch them', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create User and 5 Recipes
  for (let i = 0; i < 5; i++) {
    await createRecipe(xAuthToken);
  }

  // Get All Recipies
  const recipesResponse = await request(app).get('/api/recipes/');

  expect(recipesResponse.status).toEqual(200);

  const recipies = recipesResponse.body;

  expect(recipies.length).toEqual(5);
});

it("authorized user trying to create recipe specifying 'numberOfServings' property with Not A Number", async () => {
  const xAuthToken = await global.signin();
  // Create recipe
  const newRecipe = {
    _id: mongoose.Types.ObjectId().toHexString(),
    title: 'Fry Potatoes',
    description: 'Tasy fry potatoes with butter and milk',
    ingredients: 'Potatoes\nButter\nMilkSaltPepper',
    directions: 'Cook Potatoes\nPut Butter & Milk\nAdd sald & pepper',
    prepTime: 20,
    cookTime: 60,
    numberOfServings: 'I AM A STRING :)',
    likes: [],
    dislikes: [],
    comments: [],
    user: mongoose.Types.ObjectId().toHexString(),
  };

  const recipeResponse = await request(app)
    .post('/api/recipes/')
    .set('Content-Type', 'application/json')
    .set('x-auth-token', xAuthToken)
    .send(newRecipe);

  expect(recipeResponse.status).toEqual(400);
});

it('authorized user trying to create recipe by specifying prepTime as a negative value', async () => {
  const xAuthToken = await global.signin();
  // Create recipe
  const newRecipe = {
    _id: mongoose.Types.ObjectId().toHexString(),
    title: 'Fry Potatoes',
    description: 'Tasy fry potatoes with butter and milk',
    ingredients: 'Potatoes\nButter\nMilkSaltPepper',
    directions: 'Cook Potatoes\nPut Butter & Milk\nAdd sald & pepper',
    prepTime: -1,
    cookTime: 60,
    numberOfServings: 2,
    likes: [],
    dislikes: [],
    comments: [],
    user: mongoose.Types.ObjectId().toHexString(),
  };

  const recipeResponse = await request(app)
    .post('/api/recipes/')
    .set('Content-Type', 'application/json')
    .set('x-auth-token', xAuthToken)
    .send(newRecipe);

  expect(recipeResponse.status).toEqual(400);
});

it('authorized user trying to create recipe by specifying prepTime as a value which is min 0', async () => {
  const xAuthToken = await global.signin();
  // Create recipe
  const newRecipe = {
    _id: mongoose.Types.ObjectId().toHexString(),
    title: 'Fry Potatoes',
    description: 'Tasy fry potatoes with butter and milk',
    ingredients: 'Potatoes\nButter\nMilkSaltPepper',
    directions: 'Cook Potatoes\nPut Butter & Milk\nAdd sald & pepper',
    prepTime: 0,
    cookTime: 60,
    numberOfServings: 2,
    likes: [],
    dislikes: [],
    comments: [],
    user: mongoose.Types.ObjectId().toHexString(),
  };

  const recipeResponse = await request(app)
    .post('/api/recipes/')
    .set('Content-Type', 'application/json')
    .set('x-auth-token', xAuthToken)
    .send(newRecipe);

  expect(recipeResponse.status).toEqual(201);
});

it('authorized user trying to create recipe by specifying cookTime as a 0 value', async () => {
  const xAuthToken = await global.signin();
  // Create recipe
  const newRecipe = {
    _id: mongoose.Types.ObjectId().toHexString(),
    title: 'Fry Potatoes',
    description: 'Tasy fry potatoes with butter and milk',
    ingredients: 'Potatoes\nButter\nMilkSaltPepper',
    directions: 'Cook Potatoes\nPut Butter & Milk\nAdd sald & pepper',
    prepTime: 5,
    cookTime: 0,
    numberOfServings: 2,
    likes: [],
    dislikes: [],
    comments: [],
    user: mongoose.Types.ObjectId().toHexString(),
  };

  const recipeResponse = await request(app)
    .post('/api/recipes/')
    .set('Content-Type', 'application/json')
    .set('x-auth-token', xAuthToken)
    .send(newRecipe);

  expect(recipeResponse.status).toEqual(400);
});

it('authorized user trying to create recipe by specifying cookTime as a value which is greater than 0', async () => {
  const xAuthToken = await global.signin();
  // Create recipe
  const newRecipe = {
    _id: mongoose.Types.ObjectId().toHexString(),
    title: 'Fry Potatoes',
    description: 'Tasy fry potatoes with butter and milk',
    ingredients: 'Potatoes\nButter\nMilkSaltPepper',
    directions: 'Cook Potatoes\nPut Butter & Milk\nAdd sald & pepper',
    prepTime: 0,
    cookTime: 5,
    numberOfServings: 2,
    likes: [],
    dislikes: [],
    comments: [],
    user: mongoose.Types.ObjectId().toHexString(),
  };

  const recipeResponse = await request(app)
    .post('/api/recipes/')
    .set('Content-Type', 'application/json')
    .set('x-auth-token', xAuthToken)
    .send(newRecipe);

  expect(recipeResponse.status).toEqual(201);
});

it('authorized user trying to create recipe by specifying ingredients and direction with a lot of empty string', async () => {
  const xAuthToken = await global.signin();

  const ingString = '    Apples\n \n \n Sugar\n\n';
  const expectedIngArr = ['Apples', 'Sugar'];
  const dirString = '    Cook\n    \n \n    \n Add Sugar';
  const expectedDirArr = ['Cook', 'Add Sugar'];

  // Create recipe
  const newRecipe = {
    title: 'Fry Potatoes',
    description: 'Tasy fry potatoes with butter and milk',
    ingredients: ingString,
    directions: dirString,
    prepTime: 20,
    cookTime: 60,
    numberOfServings: 2,
    likes: [],
    dislikes: [],
    comments: [],
    user: mongoose.Types.ObjectId().toHexString(),
  };

  let recipeResponse = await request(app)
    .post('/api/recipes/')
    .set('Content-Type', 'application/json')
    .set('x-auth-token', xAuthToken)
    .send(newRecipe);

  expect(recipeResponse.status).toEqual(201);

  // Get recipe by id
  recipeResponse = await request(app)
    .get(`/api/recipes/${recipeResponse.body.id}`)
    .set('Content-Type', 'application/json')
    .send({});

  expect(recipeResponse.body.ingredients).toEqual(expectedIngArr);
  expect(recipeResponse.body.directions).toEqual(expectedDirArr);
});

it('authorized/unauthorized user trying to get 5 pages, each page 1 recipe', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create 5 recipes
  for (let i = 0; i < 5; i++) {
    await createRecipe(xAuthToken);
  }

  const dateInMilliseconds = new Date().getTime();
  const recipesPerPage = 1;

  // Fetch 5 pages
  for (let i = 1; i <= 5; i++) {
    const res = await request(app).get(
      `/api/recipes/loadPage?page=${i}&date=${dateInMilliseconds}&perPage=${recipesPerPage}`
    );

    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(1);
  }

  // Fetching 6th page, should have 0
  const res = await request(app).get(
    `/api/recipes/loadPage?page=${6}&date=${dateInMilliseconds}&perPage=${recipesPerPage}`
  );

  expect(res.status).toEqual(200);
  expect(res.body).toEqual([]);
  expect(res.body.length).toEqual(0);
});

it('authorized/unauthorized user trying to get recipe by id', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Get recipe by id
  const recipeResponse = await request(app)
    .get(`/api/recipes/${recipe.id}`)
    .set('Contenty-Type', 'application/json')
    .send({});

  expect(recipeResponse.status).toEqual(200);
});

it('get recipe by id which does not exists', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Get recipe by id
  const recipeResponse = await request(app)
    .get(`/api/recipes/${mongoose.Types.ObjectId().toHexString()}`)
    .set('x-auth-token', xAuthToken)
    .set('Contenty-Type', 'application/json')
    .send({});

  expect(recipeResponse.status).toEqual(404);
});

it('user trying to delete recipe without being logged in', async () => {
  // Delete recipe
  const recipeResponse = await request(app)
    .delete(`/api/recipes/${mongoose.Types.ObjectId().toHexString()}`)
    .send({});

  expect(recipeResponse.status).toEqual(401);
});

it('user trying to delete recipe which does not exists', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Delete recipe
  const recipeResponse = await request(app)
    .delete(`/api/recipes/${mongoose.Types.ObjectId().toHexString()}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(404);
});

it('user trying to delete his recipe', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Delete recipe
  const recipeResponse = await request(app)
    .delete(`/api/recipes/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(204);
});

it('user trying to delete recipe he did not create', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Create another user
  const antoherUserToken = await global.signin('another@test.com');

  // Delete recipe
  const recipeResponse = await request(app)
    .delete(`/api/recipes/${recipe.id}`)
    .set('x-auth-token', antoherUserToken)
    .send({});

  expect(recipeResponse.status).toEqual(401);
});

/* Likes / Dislikes */
it('unauthorized user trying to like recipe', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Like recipe
  const recipeResponse = await request(app)
    .put(`/api/recipes/like/${recipe.id}`)
    .send({});

  expect(recipeResponse.status).toEqual(401);
});

it('authorized user trying to like recipe which does not exist', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Like recipe
  const recipeResponse = await request(app)
    .put(`/api/recipes/like/${mongoose.Types.ObjectId().toHexString()}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(404);
});

it('authorized user trying to like recipe which has been already liked by him', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Like recipe
  let recipeResponse = await request(app)
    .put(`/api/recipes/like/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(200);
  expect(recipeResponse.body.length).toEqual(1);

  // Like recipe one more time
  recipeResponse = await request(app)
    .put(`/api/recipes/like/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(400);
});

it('authorized user trying to like recipe which has been disliked by him', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Dislike recipe
  let recipeResponse = await request(app)
    .put(`/api/recipes/dislike/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(200);
  expect(recipeResponse.body.length).toEqual(1);

  // Like recipe
  recipeResponse = await request(app)
    .put(`/api/recipes/like/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(200);
  expect(recipeResponse.body.length).toEqual(1);

  // Get recipe
  recipeResponse = await request(app)
    .get(`/api/recipes/${recipe.id}`)
    .set('Contenty-Type', 'application/json')
    .send({});

  expect(recipeResponse.status).toEqual(200);

  // Check dislikes
  expect(recipeResponse.body.dislikes.length).toEqual(0);

  // Check likes
  expect(recipeResponse.body.likes.length).toEqual(1);
});

it('authorized user trying to like recipe which exist and nor liked neither disliked by this user', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Like recipe
  let recipeResponse = await request(app)
    .put(`/api/recipes/like/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(200);
  expect(recipeResponse.body.length).toEqual(1);
});

it('unauthorized user trying to dislike recipe', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Like recipe
  const recipeResponse = await request(app)
    .put(`/api/recipes/dislike/${recipe.id}`)
    .send({});

  expect(recipeResponse.status).toEqual(401);
});

it('authorized user trying to dislike recipe which does not exist', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Like recipe
  const recipeResponse = await request(app)
    .put(`/api/recipes/like/${mongoose.Types.ObjectId().toHexString()}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(404);
});

it('authorized user trying to dislike recipe which has been already disliked by him', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Dislike recipe
  let recipeResponse = await request(app)
    .put(`/api/recipes/dislike/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(200);
  expect(recipeResponse.body.length).toEqual(1);

  // Disike recipe one more time
  recipeResponse = await request(app)
    .put(`/api/recipes/dislike/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(400);
});

it('authorized user trying to dislike recipe which has been liked by him', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Like recipe
  let recipeResponse = await request(app)
    .put(`/api/recipes/like/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(200);
  expect(recipeResponse.body.length).toEqual(1);

  // Disike recipe one more time
  recipeResponse = await request(app)
    .put(`/api/recipes/dislike/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(200);
  expect(recipeResponse.body.length).toEqual(1);
});

it('authorized user trying to dislike recipe', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Dislike recipe
  let recipeResponse = await request(app)
    .put(`/api/recipes/dislike/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(200);
  expect(recipeResponse.body.length).toEqual(1);
});

/* Comments */
it('unauthorized user trying to comment recipe', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Comment recipe
  const recipeResponse = await request(app)
    .post(`/api/recipes/comment/${recipe.id}`)
    .send({ text: 'comment' });

  expect(recipeResponse.status).toEqual(401);
});

it('authorized user trying to comment recipe without specifying text', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Comment recipe
  const recipeResponse = await request(app)
    .post(`/api/recipes/comment/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(400);
});

it('authorized user trying to comment recipe which does not exist', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Comment recipe
  const recipeResponse = await request(app)
    .post(`/api/recipes/comment/${mongoose.Types.ObjectId().toHexString()}`)
    .set('x-auth-token', xAuthToken)
    .send({ text: 'comment' });

  expect(recipeResponse.status).toEqual(404);
});

it('unauthorized user trying to delete comment', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Comment recipe
  let recipeResponse = await request(app)
    .post(`/api/recipes/comment/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({ text: 'comment' });

  expect(recipeResponse.status).toEqual(201);

  // Find newly created comment
  const commentId = recipeResponse.body[0]._id.toString();

  // Delete comment
  recipeResponse = await request(app)
    .delete(`/api/recipes/comment/${recipe.id}/${commentId}`)
    .send({});

  expect(recipeResponse.status).toEqual(401);
});

it('authorized user trying to delete comment from recipe(does not exist)', async () => {
  // Create user
  const xAuthToken = await global.signin();

  const validId = mongoose.Types.ObjectId().toHexString();

  // Delete comment
  const recipeResponse = await request(app)
    .delete(`/api/recipes/comment/${validId}/${validId}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(404);
});

it('authorized user trying to delete comment(doest not exist)', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Delete comment
  const recipeResponse = await request(app)
    .delete(
      `/api/recipes/comment/${
        recipe.id
      }/${mongoose.Types.ObjectId().toHexString()}`
    )
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(404);
});

it('authorized user trying to delete comment he do not own', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create another user
  const anotherUserToken = await global.signin('anotheruser@test.com');

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Create comment
  let recipeResponse = await request(app)
    .post(`/api/recipes/comment/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({ text: 'comment' });

  // Find newly created comment
  const commentId = recipeResponse.body[0]._id.toString();

  // Delete comment
  recipeResponse = await request(app)
    .delete(`/api/recipes/comment/${recipe.id}/${commentId}`)
    .set('x-auth-token', anotherUserToken)
    .send({});

  expect(recipeResponse.status).toEqual(401);
});

it('authorized user successfuly delete comment he created', async () => {
  // Create user
  const xAuthToken = await global.signin();

  // Create recipe
  const { recipe } = await createRecipe(xAuthToken);

  // Create comment
  let recipeResponse = await request(app)
    .post(`/api/recipes/comment/${recipe.id}`)
    .set('x-auth-token', xAuthToken)
    .send({ text: 'comment' });

  // Find newly created comment
  const commentId = recipeResponse.body[0]._id.toString();

  // Delete comment
  recipeResponse = await request(app)
    .delete(`/api/recipes/comment/${recipe.id}/${commentId}`)
    .set('x-auth-token', xAuthToken)
    .send({});

  expect(recipeResponse.status).toEqual(204);
});
