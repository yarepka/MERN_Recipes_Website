const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  name: {
    type: String
  },

  userImagePath: {
    type: String
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
    type: Number,
    required: true
  },

  cookTime: {
    type: Number,
    required: true
  },

  numberOfServings: {
    type: Number,
    required: true
  },

  readyIn: {
    type: Number,
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
      text: {
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

  imagePath: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

module.exports = Recipe = mongoose.model('Recipe', RecipeSchema);