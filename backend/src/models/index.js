const { Sequelize } = require('sequelize');
const config = require('../config/config');
const UserModel = require('./user');
const ContactModel = require('./contact');
const TodoModel = require('./todo');
const ActionModel = require('./action');

const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env];

const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  {
    host: sequelizeConfig.host,
    dialect: sequelizeConfig.dialect,
    logging: false,
  }
);

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
