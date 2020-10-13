const mongoose = require('mongoose');
const config = require('config');
const products = require('./data/recipes');
const connectDB = require('./config/db');
const Recipe = require('./models/Recipe');

connectDB();

const importData = async () => {
  try {
    await Recipe.deleteMany();
    await Recipe.insertMany(products);
    console.log('Data Imported');
    process.exit();
  } catch (err) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
