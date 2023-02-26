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
      startDate: Sequelize.literal('2015-02-01'),
      endDate: Sequelize.literal('2015-02-01')
    },
    {
      spotId: 1,
      userId: 3,
      startDate: Sequelize.literal('2017-02-01'),
      endDate: Sequelize.literal('2017-02-12')
    },
    {
      spotId: 2,
      userId: 3,
      startDate: Sequelize.literal('2016-02-01'),
      endDate: Sequelize.literal('2016-02-12')
    }], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
