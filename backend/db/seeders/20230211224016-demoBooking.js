'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Bookings", [{
      spotId: 1,
      userId: 2,
      startDate: Sequelize.literal('CURRENT_TIMESTAMP'),
      endDate: Sequelize.literal('CURRENT_TIMESTAMP')
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Bookings");
  }
};
