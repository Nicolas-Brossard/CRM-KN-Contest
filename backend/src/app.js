const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const usersRouter = require('./routes/users');
const actionRoute = require('./routes/action');
const todoRoute = require('./routes/todo');
const contactRoute = require('./routes/contact');
const authRoutes = require('./routes/auth');

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

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
