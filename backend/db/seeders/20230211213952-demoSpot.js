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
      description: "Entire back yard!!",
      price: 210,
      ownerId: 1,
    },
    {
      address: "1542 Zion National Park",
      city: "Zion",
      state: "Utah",
      country: "United States",
      lat: 39.86,
      lng: 60.74,
      name: "Zion",
      description: "a place to hike",
      price: 200,
      ownerId: 3,
    },
    {
      address: "1542 Grand Teton",
      city: "Montana",
      state: "Montana",
      country: "United States",
      lat: 99.66,
      lng: 90.79,
      name: "Grand Teton National",
      description: "a place to freeze",
      price: 290,
      ownerId: 2,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
