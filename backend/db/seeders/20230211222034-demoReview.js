'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [{
      review: "This was an awesome spot!",
      stars: 5,
      userId: 1,
      spotId: 2,
      createdAt: new Date('2023-02-01'),
      updatedAt: new Date('2023-02-01')
    },
    {
      review: "This was an epic spot yooo!",
      stars: 4,
      userId: 2,
      spotId: 3,
      createdAt: new Date('2023-03-01'),
      updatedAt: new Date('2023-03-01')
    },
    {
      review: "This was freezing!",
      stars: 2,
      userId: 3,
      spotId: 3,
      createdAt: new Date('2023-04-01'),
      updatedAt: new Date('2023-04-01'),
    },    
    {
      review: "This was an awesome spot!",
      stars: 5,
      userId: 1,
      spotId: 2,
      createdAt: new Date('2023-02-16'),
      updatedAt: new Date('2023-02-16')
    },
    {
      review: "This wa",
      stars: 4,
      userId: 2,
      spotId: 3,
      createdAt: new Date('2023-03-26'),
      updatedAt: new Date('2023-03-26')
    }], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {}, {});
  }
};