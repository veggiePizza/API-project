'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Bookings", [{
      spotId: 1,
      userId: 2,
      startDate: "2021-11-19",
      endDate: "2021-11-20"
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Bookings", [{
      spotId: 1,
      userId: 2,
      startDate: "2021-11-19",
      endDate: "2021-11-20"
    }]);
  }
};
