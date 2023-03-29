const { Sequelize } = require('sequelize');
const config = require('../config/config');
const ContactModel = require('./contact');
const CompanyModel = require('./company');
const ActionModel = require('./action');
const TodoModel = require('./todo');
const UserModel = require('./user');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
});

const models = {
  User: UserModel(sequelize),
  Contact: ContactModel(sequelize),
  Company: CompanyModel(sequelize),
  Action: ActionModel(sequelize),
  Todo: TodoModel(sequelize),
};

Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

module.exports = { ...models, sequelize, Sequelize };
