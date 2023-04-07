const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const adminUser = await queryInterface.sequelize.query(
      'SELECT * FROM "Users" WHERE is_admin = true',
      {
        type: QueryTypes.SELECT,
      }
    );

    if (adminUser.length === 0) {
      await queryInterface.bulkInsert(
        'Users',
        [
          {
            username: 'admin',
            password: 'admin',
            email: 'admin@admin.com',
            is_admin: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { is_admin: true }, {});
  },
};
