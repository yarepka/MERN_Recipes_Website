const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const config = require('config');

const auth = require('../../middleware/auth');
const validateRequest = require('../../middleware/validateRequest');
const Recipe = require('../../models/Recipe');

// @route  POST api/recipe
// @desc   Create a recipe
// @access Private(need token)
router.post('/',
  [auth,
    [
      body('description', 'Description is required').not().isEmpty(),
      body('title', 'Title is required').not().isEmpty(),
      body('ingredients', 'Ingredients is required').not().isEmpty(),
      body('directions', 'Directions is required').not().isEmpty(),
      body('prepTime', 'Preparation time is required').not().isEmpty(),
      body('cookTime', 'Cook time is required').not().isEmpty(),
      body('numberOfServings', 'Number of servings is required').not().isEmpty(),
      body('numberOfServings', 'Number of servings must be numberic value').isNumeric(),
      body('readyIn', 'Ready In is required')
    ],
    validateRequest],
  async (req, res) => {
    const { description, title, ingredients, directions, prepTime, cookTime, numberOfServings, readyIn } = req.body;

    try {
      const newRecipe = {
        title,
        description,
        ingredients: ingredients.split('\n'),
        directions: directions.split('\n'),
        prepTime,
        cookTime,
        readyIn,
        numberOfServings,
        likes: [],
        dislikes: [],
        comments: [],
        imagePath: '',
        user: req.user.id
      };

      // upload an image
      let imagePath;
      if (!req.files) {
        imagePath = config.get('defaultRecipeImage');
      } else {
        const file = req.files.file;
        console.log('file: ', file);

        imagePath = `recipe-${+ new Date().getMilliseconds()}`;
        await file.mv(`${__dirname}/client/public/uploads/${imagePath}`);
      }

      newRecipe.imagePath = imagePath;

      const recipe = new Recipe(newRecipe);
      await recipe.save();

      return res.json(recipe);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

// @route  GET api/recipes
// @desc   Get all recipes
// @access Public
router.get('/', async (req, res) => {
  try {
    // sorting all recipes, to get recent recipes first
    const recipes = await Recipe.find().sort({ date: -1 });
    return res.json(recipes);
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

    return res.json(recipe);
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

    console.log('Deleteing: ', recipe);

    if (!recipe) {
      return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
    }

    // Check user
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'User not authorized' }] });
    }

    await recipe.remove();

    return res.json({ msg: 'Recipe removed' });
  } catch (err) {
    console.log(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Recipe not found' }] });
    }

    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

module.exports = router;