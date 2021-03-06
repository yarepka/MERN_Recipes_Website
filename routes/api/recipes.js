const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const clearString = require('../../utils/clearString');
const auth = require('../../middleware/auth');
const validateRequest = require('../../middleware/validateRequest');
const Recipe = require('../../models/Recipe');
const User = require('../../models/User');

// @route  POST api/recipe
// @desc   Create a recipe
// @access Private(need token)
router.post(
  '/',
  [
    auth,
    [
      body('description', 'Description is required').not().isEmpty(),
      body('title', 'Title is required').not().isEmpty(),
      body('ingredients', 'Ingredients is required').not().isEmpty(),
      body('directions', 'Directions is required').not().isEmpty(),
      body('prepTime', 'Preparation time is required').not().isEmpty(),
      body(
        'prepTime',
        'Preparation time must be number greater or equal to 0'
      ).isInt({ min: 0 }),
      body('cookTime', 'Cook time is required').not().isEmpty(),
      body('cookTime', 'Cook time must be number greater than 0').isInt({
        gt: 0,
      }),
      body('numberOfServings', 'Number of servings is required')
        .not()
        .isEmpty(),
      body(
        'numberOfServings',
        'Number of servings must be numberic value'
      ).isNumeric(),
      body(
        'numberOfServings',
        'Number of serving must be greater than 0'
      ).isInt({ gt: 0 }),
      body('readyIn', 'Ready In is required'),
    ],
    validateRequest,
  ],
  async (req, res) => {
    const {
      description,
      title,
      ingredients,
      directions,
      prepTime,
      cookTime,
      numberOfServings,
    } = req.body;

    try {
      const user = await User.findById(req.user.id);
      const recipeId = mongoose.Types.ObjectId();

      const newRecipe = {
        _id: recipeId,
        title,
        description,
        ingredients: clearString(ingredients.split('\n')),
        directions: clearString(directions.split('\n')),
        prepTime,
        cookTime,
        readyIn: parseInt(prepTime) + parseInt(cookTime),
        numberOfServings,
        likes: [],
        dislikes: [],
        comments: [],
        imagePath: config.get('defaultRecipeImage'),
        user: req.user.id,
        name: user.name,
        userImagePath: user.imagePath,
      };

      // upload an image
      let imagePath;
      if (!req.files) {
        imagePath = config.get('defaultRecipeImage');
      } else {
        const file = req.files.file;

        imagePath = `recipes/recipe-${
          title.replace(/[^\w]/g, '') +
          recipeId.toHexString() +
          new Date().getMilliseconds()
        }${path.extname(req.files.file.name)}`;

        await file.mv(path.join(path.resolve(), 'uploads', imagePath));
      }

      newRecipe.imagePath = imagePath;

      const recipe = new Recipe(newRecipe);
      await recipe.save();

      return res.status(201).json(recipe);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

// @route  GET api/recipes/
// @desc   Get all recipes
// @access Public
router.get('/', async (req, res) => {
  try {
    // sorting all recipes, to get recent recipes first
    const recipes = await Recipe.find().sort({ date: -1 });
    return res.status(200).json(recipes);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route  GET api/recipes/loadPage?page=1&date=242134235&perPage=1
// @desc   Get next page with recipes
// @access Public
router.get('/loadPage', async (req, res) => {
  try {
    // Get page
    const page = parseInt(req.query.page);
    const dateInMilliseconds = parseInt(req.query.date);
    const recipesPerPage = req.query.perPage
      ? parseInt(req.query.perPage)
      : config.get('recipesPerPage');

    if (!page && !dateInMilliseconds) {
      return res.status(400).json({
        errors: [{ msg: 'page and date query parameters must be specified' }],
      });
    }

    const dateFromMilliseconds = new Date(dateInMilliseconds);

    // Get next page recipes
    const recipes = await Recipe.find({
      date: { $lte: dateFromMilliseconds },
    })
      .sort({ date: 'desc' })
      .skip((page - 1) * recipesPerPage)
      .limit(recipesPerPage);

    return res.status(200).json(recipes);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route   GET api/recipes/:id
// @desc    Get recipe by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
    }

    return res.status(200).json(recipe);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
    }

    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route   DELETE api/recipes/:id
// @desc    Delete a recipe
// @access  Private(need token to be accessed)
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
    }

    // Check user
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'User not authorized' }] });
    }

    await recipe.remove();

    return res.status(204).json({ msg: 'Recipe removed' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
    }

    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route   PUT api/recipes/like/:id
// @desc    Like a recipe
// @access  Private(need token to be accessed)
router.put('/like/:id', auth, async (req, res) => {
  try {
    // Get recipe
    const recipe = await Recipe.findById(req.params.id);

    // Check if recipe exists
    if (!recipe) {
      return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
    }

    // Check if the recipe has alreay been liked by this user
    if (
      recipe.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Recipe already liked' }] });
    }

    // Check if the recipe was Disliked
    let dislikeIndex;
    for (let i = 0; i < recipe.dislikes.length; i++) {
      if (recipe.dislikes[i].user.toString() === req.user.id) {
        dislikeIndex = i;
        break;
      }
    }

    // If recipe was Disliked
    if (dislikeIndex || dislikeIndex === 0) {
      // Remove disliked
      recipe.dislikes.splice(dislikeIndex, 1);
    }

    // Add Like
    // Unshift is same as push, but adds new element to the beggining
    recipe.likes.unshift({ user: req.user.id });

    await recipe.save();

    return res.status(200).json(recipe.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
    }

    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route   PUT api/recipes/dislike/:id
// @desc    Dislike a recipe
// @access  Private(need token to be accessed)
router.put('/dislike/:id', auth, async (req, res) => {
  try {
    // Get recipe
    const recipe = await Recipe.findById(req.params.id);

    // Check if recipe exists
    if (!recipe) {
      return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
    }

    // Check if the recipe has alreay been disliked by this user
    if (
      recipe.dislikes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Recipe already disliked' });
    }

    // Check if the recipe was Liked
    let likeIndex;
    for (let i = 0; i < recipe.likes.length; i++) {
      if (recipe.likes[i].user.toString() === req.user.id) {
        likeIndex = i;
        break;
      }
    }

    // If recipe was Liked
    if (likeIndex || likeIndex === 0) {
      // Remove disliked
      recipe.likes.splice(likeIndex, 1);
    }

    // Add Like
    // Unshift is same as push, but adds new element to the beggining
    recipe.dislikes.unshift({ user: req.user.id });

    await recipe.save();

    return res.json(recipe.dislikes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
    }

    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route   POST api/recipes/comment/:id
// @desc    Comment on a recipe
// @access  Private (need token)
router.post(
  '/comment/:id',
  auth,
  [body('text', 'Text is required').not().isEmpty()],
  validateRequest,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      const recipe = await Recipe.findById(req.params.id);

      // Make sure recipe exists
      if (!recipe) {
        return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
      }

      const newComment = {
        text: req.body.text,
        name: user.name,
        imagePath: user.imagePath,
        user: req.user.id,
      };

      recipe.comments.unshift(newComment);

      await recipe.save();

      res.status(201).json(recipe.comments);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
      }

      return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

// @route   DELETE api/recipes/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private (need token)
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    // Make sure recipe exists
    if (!recipe) {
      return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
    }

    // Pull out comment and it's index
    let comment;
    let commentIndex;
    for (let i = 0; i < recipe.comments.length; i++) {
      if (recipe.comments[i].id === req.params.comment_id) {
        comment = recipe.comments[i];
        commentIndex = i;
        break;
      }
    }

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ errors: [{ msg: 'Comment not found' }] });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'User not authorized' }] });
    }

    // Remove comment
    recipe.comments.splice(commentIndex, 1);

    await recipe.save();

    return res.status(204).json(recipe.comments);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
    }

    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

module.exports = router;
