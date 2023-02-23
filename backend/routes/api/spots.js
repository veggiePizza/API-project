const express = require('express');
const { Spot, Review, Booking, SpotImage, User, ReviewImage } = require('../../db/models');
const { requireAuth, authIsSpot, authIsSpotNot } = require('../../utils/auth');
const router = express.Router();
var Sequelize = require("sequelize");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

let schema;
if (process.env.NODE_ENV === 'production'){
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
    .isInt({max: 5 , min:1})
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

//Get all Spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    attributes: {
      include: [
        [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
        [Sequelize.literal(
                    `(SELECT url FROM ${
                      schema ? `"${schema}"."SpotImages"` : 'SpotImages'
                    } WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true ORDER BY 'id' LIMIT 1)`
                  ), 'previewImage'],
      ]
    },
    include: [{ model: Review, attributes: [] }, { model: SpotImage, attributes: [] }],
    group: "spot.id",
  });
  if (spots) return res.status(200).json(spots);
});

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  const spots = await Spot.findAll({
    where: { ownerId: user.id },
    // attributes: {}
  });
  if (spots) return res.status(200).json(spots);
});

//Get details of a Spot from an id
router.get('/:id', async (req, res) => {
  const spots = await Spot.findAll({
    where: { id: req.params.id },
    attributes: {
      include: [
        [Sequelize.fn('COUNT', Sequelize.col('review')), 'numReviews'],
        [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating'],
      ]
    },
    include: [
      { model: Review, attributes: [] },
      { model: SpotImage, attributes: ['id', 'url', 'preview'] },
      { model: User, attributes: ['id', 'firstName', 'lastName'], as: "Owner" }
    ],
  });
  if (spots) return res.status(200).json(spots);
  return res.status(404).json({ message: "Spot couldn't be found" })

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
  return res.status(404).json({ message: "Spot couldn't be found" });
});

//Delete a Spot
router.delete('/:id', requireAuth, authIsSpot, async (req, res) => {
  const spot = await Spot.findByPk(req.params.id);
  if (spot) {
    await spot.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
  }
  return res.status(404).json({ message: "Spot couldn't be found" });
});

//Get all Reviews by a Spot's id
router.get('/:id/reviews', requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: { spotId: req.params.id },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: ReviewImage, attributes: ['id', 'url'] }
    ],
  });
  if (reviews) return res.status(200).json(reviews);
  return res.status(404).json({ message: "Spot couldn't be found" });
});

//Create a Review for a Spot based on the Spot's id
router.post('/:id/reviews', requireAuth, validateReview, async (req, res) => {
  const { review, stars } = req.body;
  const { user } = req;
  const spot = await Spot.findByPk(req.params.id);
  if (spot) {
    const newReview = await Review.create({ review, stars, userId: user.id, spotId: spot.id })
    if (newReview) return res.status(201).json(newReview);
    return res.status(404).json({ message: "Image was not created" });
  }
  return res.status(404).json({ message: "Spot couldn't be found" });
});

//Get all Bookings for a Spot based on the Spot's id
router.get('/:id/bookings', requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({ where: { spotId: req.params.id }, attributes: ['spotId', 'startDate', 'endDate'] });
  if (bookings) return res.status(200).json({ Bookings: bookings });
});

//Create a Booking from a Spot based on the Spot's id---Body validation
router.post('/:id/bookings', requireAuth, authIsSpotNot, async (req, res) => {
  const { startDate, endDate } = req.body;
  const { user } = req;
  const spot = await Spot.findByPk(req.params.id);
  if (spot) {
    const newBooking = await Booking.create({ startDate, endDate, userId: user.id, spotId: spot.id })
    if (newBooking) return res.status(200).json(newBooking);
    return res.status(400).json({ message: "Booking was not created" });
  }
  return res.status(404).json({ message: "Spot couldn't be found" });
});

router.get('/:id/images', async (req, res) => {
  const spotImages = await SpotImage.findAll({ where: { spotId: req.params.id } });
  if (spotImages) return res.status(200).json(spotImages);
});

module.exports = router;
