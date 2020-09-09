const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect Database
connectDB();

// body parser
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));