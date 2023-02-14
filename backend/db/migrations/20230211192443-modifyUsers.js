'use strict';

/** @type {import('sequelize-cli').Migration} */



module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([

      await queryInterface.addColumn('Users','firstName', {
        type: Sequelize.STRING,
      }),
      await queryInterface.addColumn('Users','lastName', {
        type: Sequelize.STRING,
      }),

    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users','firstName');
    await queryInterface.removeColumn('Users','lastName');
  }
};
