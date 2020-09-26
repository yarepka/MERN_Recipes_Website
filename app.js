const express = require('express');

const app = express();
const fileUpload = require('express-fileupload');

app.use(fileUpload());

// body parser
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/recipes', require('./routes/api/recipes'));

module.exports = app;