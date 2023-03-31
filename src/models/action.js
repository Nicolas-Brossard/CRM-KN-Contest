const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Action = sequelize.define('Action', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  Action.associate = (models) => {
    Action.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Action.belongsTo(models.Contact, {
      foreignKey: 'contact_id',
      as: 'contact',
    });
  };

  return Action;
};
