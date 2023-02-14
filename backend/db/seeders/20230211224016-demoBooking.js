'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [{
      spotId: 1,
      userId: 2,
      startDate: Sequelize.literal('CURRENT_TIMESTAMP'),
      endDate: Sequelize.literal('CURRENT_TIMESTAMP')
    }], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
