'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        url: "https://sedona.org/wp-content/uploads/2021/05/Airbnb-Sedona-Homes.jpeg",
        preview: true,
        spotId: 1
      },
      {
        url: "https://theplanetd.com/images/Things-to-do-in-Sedona-Arizona.jpg",
        preview: true,
        spotId: 1
      },
      {
        url: "https://cf.ltkcdn.net/seniors/images/orig/240945-2119x1414-sedona-arizona.jpg",
        preview: true,
        spotId: 1
      },
      {
        url: "https://www.josephfiler.com/images/xl/Arizona-Sedona-Cathedral-Rock-5379-Edit.jpg",
        preview: true,
        spotId: 1
      },
      {
        url: "https://cf.ltkcdn.net/seniors/images/orig/240945-2119x1414-sedona-arizona.jpg",
        preview: true,
        spotId: 1
      },

      {
        url: "https://www.territorysupply.com/wp-content/uploads/2020/06/airbnb-zion-national-park.jpg",
        preview: true,
        spotId: 2
      },
      {
        url: "https://www.myutahparks.com/wp-content/uploads/2021/02/Zion-Watchman-swimmers_Tam19RichMartello_1600.jpg",
        preview: true,
        spotId: 2
      },
      {
        url: "https://media.cntraveler.com/photos/56c4b2bc5464a8041fd7b883/16:9/w_1280,c_limit/more-than-just-parks-cr.jpg",
        preview: true,
        spotId: 2
      },

      {
        url: "https://eternalarrival.com/wp-content/uploads/2021/02/ed10c4e3-ad34-48df-bb45-e2d2ed4ee921.jpg",
        preview: true,
        spotId: 3
      },
      {
        url: "https://media.tacdn.com/media/attractions-splice-spp-674x446/10/46/37/bc.jpg",
        preview: true,
        spotId: 3
      },
      {
        url: "https://57hours.com/wp-content/uploads/2021/06/hiking-grand-teton.jpg",
        preview: true,
        spotId: 3
      },
      {
        url: "https://www.rmrentals.com/sites/default/files/uploads/summer-sunset-at-snake-river-overlook-web.jpg",
        preview: true,
        spotId: 3
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
