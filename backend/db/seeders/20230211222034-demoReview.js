'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Reviews", [{
      review: "This was an awesome spot!",
      stars: 5,
      userId: 1,
      spotId: 1,
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Reviews" ,[{
      review: "This was an awesome spot!",
      stars: 5,
      userId: 1,
      spotId: 1,
    }]);
  }
};