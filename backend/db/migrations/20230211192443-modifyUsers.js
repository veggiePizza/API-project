'use strict';

/** @type {import('sequelize-cli').Migration} */
/*
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}*/

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([

      await queryInterface.addColumn("Users","firstName", {
        type: Sequelize.STRING,
      }),//,options
      await queryInterface.addColumn("Users","lastName", {
        type: Sequelize.STRING,
      }),//,options

    ]);
  },

  async down (queryInterface, Sequelize) {
    //options.tableName = "Users";
    //await queryInterface.removeColumn(options,"firstName");
    //await queryInterface.removeColumn(options,"lastName");

    await queryInterface.removeColumn("Users","firstName");
    await queryInterface.removeColumn("Users","firstName");
  }
};
