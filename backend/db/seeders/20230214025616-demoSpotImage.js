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
      url: "../../pictures/sedona.jpeg",
      preview: true,
      spotId: 1
    },
    {
      url: "../../pictures/zion.jpeg",
      preview: true,
      spotId: 2
    },
    {
      url: "../../pictures/grand_teton.jpeg",
      preview: false,
      spotId: 3
    }], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
