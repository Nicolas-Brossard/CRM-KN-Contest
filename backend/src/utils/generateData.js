const { sequelize, models } = require('./models');
const { User, Contact } = models;
const { faker } = require('@faker-js/faker');

async function createContacts(userId) {
    const contactTypes = ['Clients', 'Prospects', 'Leads'];

    for (let i = 0; i < 10; i++) {
      await Contact.create({
        type: contactTypes[Math.floor(Math.random() * contactTypes.length)],
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        company: faker.company.name(),
        location: faker.address.city(),
        status: faker.datatype.boolean() ? 'actif' : 'inactif',
        position: faker.datatype.number({ min: 0, max: 100 }),
        user_id: userId,
      });
    }
}

async function initializeDatabase() {
    const adminUser = await User.findOrCreate({
        where: { username: 'admin' },
        defaults: {
          username: 'admin',
          password: 'admin',
          email: 'admin@admin.com',
          is_admin: true,
        },
      });
    
      await createContacts(adminUser[0].id);
    
    }

initializeDatabase().then(() => {
  console.log('Data generated successfully.');
});
