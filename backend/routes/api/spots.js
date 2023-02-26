const express = require('express');
const { Spot, Review, Booking, SpotImage, User, ReviewImage } = require('../../db/models');
const { requireAuth, authIsSpot, authIsSpotNot, bookingConflict } = require('../../utils/auth');
const router = express.Router();
var Sequelize = require("sequelize");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

let schema;
if (process.env.NODE_ENV === 'production') {
  schema = process.env.SCHEMA;
}

const validateSpot = [
  check('address')
    .notEmpty()
    .withMessage('Street address is required'),
  check('city')
    .notEmpty()
    .withMessage('City is required'),
  check('state')
    .notEmpty()
    .withMessage('State is required'),
  check('country')
    .notEmpty()
    .withMessage('Country is required'),
  check('lat')
    .isNumeric()
    //.toString() 
    //.isLatLong()
    .withMessage('Latitude is not valid'),
  check('lng')
    //.isLatLong()
    .isNumeric()
    .withMessage('Longitude is not valid'),
  check('name')
    .isLength({ max: 49 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .notEmpty()
    .withMessage('Description is required'),
  check('price')
    .notEmpty()
    .withMessage('Price per day is required'),
  handleValidationErrors
];

const validateReview = [
  check('review')
    .notEmpty()
    .withMessage('Review text is required'),
  check('stars')
    .notEmpty()
    .isInt({ max: 5, min: 1 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

const validateDate = [
  check('endDate').custom((value, { req }) => {
    if (new Date(value) > new Date(req.body.startDate)) return true;
    return false;
  })
    .withMessage('endDate cannot be on or before startDate'),
  handleValidationErrors
];

const validateQuery = [
  check('page')
    .optional()
    .isInt({ max: 10, min: 1 })
    .withMessage('Page must be greater than or equal to 1'),
  check('size')
    .optional()
    .isInt({ max: 20, min: 1 })
    .withMessage('Size must be greater than or equal to 1'),
  check('maxLat')
    .optional()
    .isDecimal()
    .withMessage('Maximum latitude is invalid'),
  check('minLat')
    .optional()
    .isDecimal()
    .withMessage('Minimum latitude is invalid'),
  check('minLng')
    .optional()
    .isDecimal()
    .withMessage('Maximum longitude is invalid'),
  check('maxLng')
    .optional()
    .isDecimal()
    .withMessage('Minimum longitude is invalid'),
  check('minPrice')
    .optional()
    .isDecimal({ min: 0 })
    .withMessage('Maximum price must be greater than or equal to 0'),
  check('maxPrice')
    .optional()
    .isDecimal({ min: 0 })
    .withMessage('Minimum price must be greater than or equal to 0'),
  handleValidationErrors
];

//Get all Spots
router.get('/', validateQuery, async (req, res) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  page = parseInt(page);
  size = parseInt(size);
  minLat = parseInt(minLat);
  maxLat = parseInt(maxLat);
  minLng = parseInt(minLng);
  maxLng = parseInt(maxLng);
  minPrice = parseInt(minPrice);
  maxPrice = parseInt(maxPrice);

  if (Number.isNaN(page)) page = 1;
  if (Number.isNaN(size)) size = 20;
  const where = {};

    if (minLat) where.lat = {[Op.gte]:minLat};
    if (maxLat) where.lat = {[Op.lte]:maxLat};
    if (minLng) where.lng = {[Op.gte]:minlng};
    if (maxLng) where.lng = {[Op.lte]:maxLng};
    if (minPrice) where.price = {[Op.gte]:minPrice};
    if (maxPrice) where.price = {[Op.lte]:maxPrice};

    const spots = await Spot.findAll({
      where,
      attributes: {
        include: [
          [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
          [Sequelize.literal(
            `(SELECT url FROM ${schema ? `"${schema}"."SpotImages"` : 'SpotImages'
            } WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)`
          ), 'previewImage'],
        ]
      },
      include: [{ model: Review, attributes: [] }, { model: SpotImage, attributes: [] }],
      group: "Spot.id",
      limit: size,
      offset: (page - 1) * size,
      subQuery: false
    });
    if (spots) return res.status(200).json({ Spots: spots, page, size });
  });

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  const spots = await Spot.findAll({
    where: { ownerId: user.id },
    attributes: {
      include: [
        [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
        [Sequelize.literal(
          `(SELECT url FROM ${schema ? `"${schema}"."SpotImages"` : 'SpotImages'
          } WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)`
        ), 'previewImage'],
      ]
    },
    include: [{ model: Review, attributes: [] }, { model: SpotImage, attributes: [] }],
    group: "Spot.id",
  });
  if (spots) return res.status(200).json(spots);
});

//Get details of a Spot from an id
router.get('/:id', async (req, res) => {
  const spot = await Spot.findByPk(req.params.id, {
    attributes: {
      include: [
        //  [Sequelize.fn('COUNT', Sequelize.col('Reviews.review')), 'numReviews'],
        //[Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating'],
        [Sequelize.literal(
          `(SELECT COUNT(review) FROM ${schema ? `"${schema}"."Reviews"` : 'Reviews'
          } WHERE "Reviews"."spotId" = "Spot"."id")`
        ), 'numReviews'],
        [Sequelize.literal(
          `(SELECT AVG(stars) FROM ${schema ? `"${schema}"."Reviews"` : 'Reviews'
          } WHERE "Reviews"."spotId" = "Spot"."id")`
        ), 'avgStarRating'],
      ]
    },
    include: [
      { model: Review, attributes: [] },
      { model: SpotImage, attributes: ['id', 'url', 'preview'] },
      { model: User, attributes: ['id', 'firstName', 'lastName'], as: "Owner" }
    ],
  });
  if (spot) return res.status(200).json(spot);
  return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
});

//Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const newSpot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price })
  if (newSpot) return res.status(201).json(newSpot);
});

//Add an Image to a Spot based on the Spot's id
router.post('/:id/images', requireAuth, authIsSpot, async (req, res) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.id);
  const newSpotImage = await SpotImage.create({ url, preview, spotId: spot.id })
  if (newSpotImage) return res.status(200).json({ id: newSpotImage.id, url: newSpotImage.url, preview: newSpotImage.preview });
});

//Edit a Spot
router.put('/:id', requireAuth, authIsSpot, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  await Spot.update(
    { address, city, state, country, lat, lng, name, description, price },
    { where: { id: req.params.id } })
  const spot = await Spot.findByPk(req.params.id);
  if (spot) return res.status(200).json(spot);
  return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });
});

//Delete a Spot
router.delete('/:id', requireAuth, authIsSpot, async (req, res) => {
  const spot = await Spot.findByPk(req.params.id);
  if (spot) {
    await spot.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
  }
  return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });
});

//Get all Reviews by a Spot's id
router.get('/:id/reviews', requireAuth, async (req, res) => {
  const checkSpot = await Spot.findByPk(req.params.id);
  if (checkSpot) {
    const reviews = await Review.findAll({
      where: { spotId: req.params.id },
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: ReviewImage, attributes: ['id', 'url'] }
      ],
    });
    return res.status(200).json({Reviews: reviews});
  }
  else res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });
});

//Create a Review for a Spot based on the Spot's id
router.post('/:id/reviews', requireAuth, validateReview, async (req, res) => {
  const { review, stars } = req.body;
  const { user } = req;
  const spot = await Spot.findByPk(req.params.id);
  if (spot) {
    const checkExistingReviews = await Review.findOne({ where: { spotId: req.params.id } });
    if (checkExistingReviews)
      return res.status(403).json({ message: "User already has a review for this spot", statusCode: 403 });
    const newReview = await Review.create({ review, stars, userId: user.id, spotId: spot.id })
    if (newReview) return res.status(201).json(newReview);
  }
  return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });
});

//Get all Bookings for a Spot based on the Spot's id
router.get('/:id/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.id);
  if (spot) {
    const { user } = req;
    if (user.id == spot.ownerId)
      bookings = await Booking.findAll({ where: { spotId: req.params.id }, include: { model: User, attributes: ['id', 'firstName', 'lastName'] } });
    else
      bookings = await Booking.findAll({ where: { spotId: req.params.id }, attributes: ['spotId', 'startDate', 'endDate'] });
    return res.status(200).json({ Bookings: bookings });
  }
  return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });
});

//Create a Booking from a Spot based on the Spot's id
router.post('/:id/bookings', requireAuth, authIsSpotNot, validateDate, bookingConflict, async (req, res) => {
  const { startDate, endDate } = req.body;
  const { user } = req;
  const spot = await Spot.findByPk(req.params.id);
  if (spot) {
    const newBooking = await Booking.create({ startDate, endDate, userId: user.id, spotId: spot.id })
    if (newBooking) return res.status(200).json(newBooking);
    return res.status(400).json({ message: "Booking was not created" });
  }
  return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });
});

router.get('/:id/images', async (req, res) => {
  const spotImages = await SpotImage.findAll({ where: { spotId: req.params.id } });
  if (spotImages) return res.status(200).json(spotImages);
});

module.exports = router;
