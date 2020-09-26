const app = require('./app');
const connectDB = require('./config/db');

const start = () => {
  const PORT = process.env.PORT || 5000;

  // Connect Database
  connectDB();

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();