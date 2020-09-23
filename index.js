const express = require('express');
const connectDB = require('./config/db');
const app = express();
const fileUpload = require('express-fileupload');

app.use(fileUpload());

// Connect Database
connectDB();

app.use(fileUpload());

// body parser
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/recipes', require('./routes/api/recipes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));