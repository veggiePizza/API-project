'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ReviewImages", [{
      url: "../pic.png",
      reviewId:1
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ReviewImages", [{
      url: "../pic.png",
      reviewId:1
    }]);
  }
}