'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("SpotImages", [{
      url: "../image.png",
      preview: true,
      spotId: 1
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("SpotImages");
  }
};
