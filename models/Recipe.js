const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  ingredients: {
    type: Array,
    minLength: 1,
    required: true
  },

  directions: {
    type: Array,
    minLength: 1,
    required: true
  },

  prepTime: {
    type: String,
    maxlength: 5,
    required: true
  },

  cookTime: {
    type: String,
    maxlength: 5,
    required: true
  },

  numberOfServings: {
    type: Number,
    required: true
  },

  reqdyIn: {
    type: String,
    required: false
  },

  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],

  dislikes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],

  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      test: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      imagePath: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Recipe = mongoose.model('Recipe', RecipeSchema);