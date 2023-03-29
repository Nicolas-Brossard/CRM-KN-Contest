const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        'lead',
        'lead_mort',
        'prospect',
        'prospect_mort',
        'client'
      ),
      allowNull: false,
      defaultValue: 'lead',
    },
    type: {
      type: DataTypes.ENUM('B2B', 'B2C'),
      allowNull: false,
    },
  });

  Contact.associate = (models) => {
    Contact.belongsTo(models.Company, {
      foreignKey: 'companyId',
      allowNull: true,
    });
  };

  return Contact;
};
