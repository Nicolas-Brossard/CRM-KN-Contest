const { Sequelize } = require('sequelize');
const config = require('../config/config');
const UserModel = require('./user');
const ContactModel = require('./contact');
const TodoModel = require('./todo');
const ActionModel = require('./action');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
});

const models = {
  User: UserModel(sequelize),
  Contact: ContactModel(sequelize),
  Todo: TodoModel(sequelize),
  Action: ActionModel(sequelize),
};

Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

module.exports = { ...models, sequelize, Sequelize };
