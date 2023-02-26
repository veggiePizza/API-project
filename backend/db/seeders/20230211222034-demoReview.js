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
    },
    {
      review: "This was an epic spot yooo!",
      stars: 4,
      userId: 2,
      spotId: 3,
    },
    {
      review: "This was freezing!",
      stars: 2,
      userId: 3,
      spotId: 3,
    }], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {}, {});
  }
};