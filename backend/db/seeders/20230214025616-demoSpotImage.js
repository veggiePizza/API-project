'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [{
      url: "../image.png",
      preview: true,
      spotId: 1
    },
    {
      url: "../image.png",
      preview: true,
      spotId: 2
    },
    {
      url: "../image.png",
      preview: false,
      spotId: 3
    }], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
