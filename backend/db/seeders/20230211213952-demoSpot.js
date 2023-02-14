'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [{
      address: "1542 Sedona Vortex",
      city: "Sedona",
      state: "Arizona",
      country: "United States",
      lat: 36.36,
      lng: 68.72,
      name: "Sedona Vortex",
      description: "a place with good views",
      price: 135,
      ownerId: 1,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
