const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { sequelize, User } = require('./models');
const usersRouter = require('./routes/users');
const actionRoute = require('./routes/action');
const todoRoute = require('./routes/todo');
const contactRoute = require('./routes/contact');
const authRoutes = require('./routes/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const pgp = require('pg-promise')();
const migrations = require('./migrations');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the CRM API');
});

app.use('/api/users', usersRouter);
app.use('/api/action', actionRoute);
app.use('/api/todo', todoRoute);
app.use('/api/contact', contactRoute);
app.use('/api/auth', authRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const runMigrations = async () => {
  try {
    for (const migration of migrations) {
      await migration.up(sequelize.getQueryInterface(), Sequelize);
    }
    console.log('Migrations executed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  }
};

const checkDatabaseConnection = async (connectionString, retries = 5) => {
  const db = pgp(connectionString);

  for (let i = 0; i < retries; i++) {
    try {
      await db.connect();
      console.log('Connected to the database');
      return true;
    } catch (err) {
      console.error(
        `Failed to connect to the database (attempt ${i + 1}):`,
        err
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  console.error('Could not connect to the database after multiple attempts');
  return false;
};

(async () => {
  try {
    const connectionString = process.env.DATABASE_URL;
    const dbConnected = await checkDatabaseConnection(connectionString);

    if (!dbConnected) {
      console.error(
        'Error initializing the application: Could not connect to the database'
      );
      return;
    }
    await sequelize.sync();

    await runMigrations();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error initializing the application:', err);
  }
})();
