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
        url: "https://images.squarespace-cdn.com/content/v1/54275b28e4b0701411e9a375/1592254839443-UX9NZ90CSCEADQO7ZVYW/Sedona+Red+Rock+Hike",
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
        url: "https://www.amtrakvacations.com/sites/amtrak/files/styles/hero/public/images/Refrigerator-Canyon-Zion-National-Park-Utah.jpg?h=16a6d817&itok=qojsKwvo",
        preview: true,
        spotId: 2
      },
      {
        url: "https://www.visittheusa.com/sites/default/files/styles/hero_l/public/images/hero_media_image/2016-10/Zion_0.jpg?h=345ab7ac&itok=2wsz6mCP",
        preview: true,
        spotId: 2
      },

      {
        url: "https://eternalarrival.com/wp-content/uploads/2021/02/ed10c4e3-ad34-48df-bb45-e2d2ed4ee921.jpg",
        preview: true,
        spotId: 3
      },
      {
        url: "https://b2052345.smushcdn.com/2052345/wp-content/uploads/2020/11/37990984-O-Edit-DeNoiseMax-and-Deband-1024x683.jpg?lossy=1&strip=1&webp=1",
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
