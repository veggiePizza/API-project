'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Spots" ,[{
      address: "1542 Sedona Vortex",
      city: "Sedona",
      country: "United States",
      lat: 36.36,
      lng: 68.72,
      name: "Sedona Vortex",
      description: "a place with good views",
      price: 135,
      ownerId: 1,
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Spots");
  }
};
