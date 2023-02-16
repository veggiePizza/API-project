const express = require('express');
const { Spot, Review, Booking, SpotImage, User , ReviewImage} = require('../../db/models');
const router = express.Router();
var Sequelize = require("sequelize");

//Get all Spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    attributes: {
      include: [
        [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating'], [Sequelize.col('url'), 'previewImage'],
      ]
    },
    include: [{ model: Review, attributes: [] }, { model: SpotImage, attributes: [] }],
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
  //********************** spots is never null
  if (spots) return res.status(200).json(spots);
  else return res.status(404).json({ message: "Spot couldn't be found" })

});

//////////check errors & validators
router.post('/', async (req, res) => {
  const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;
  const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price })
  if (newSpot) {
    return res.status(201).json(newSpot);
  }

  return res.status(400).json({ message: "Validation Error", errors });
});

//////////check errors & validators &&& authentication
router.post('/:id/images', async (req, res) => {
  const { url, preview } = req.body;
  const spot = await Spot.findAll({ where: { id: req.params.id } });
  if (spot) {
    const newSpotImage = await SpotImage.create({ url, preview, spotId: spot.id })
    if (newSpotImage) {
      return res.status(200).json(newSpotImage);
    }

    return res.status(404).json({ message: "Image was not created" });
  }
  else {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

});

//////add a try catch for validation
router.put('/:id', async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const spot = await Spot.findAll({ where: { id: req.params.id } });
  if (spot) {
    await spot.update({ address, city, state, country, lat, lng, name, description, price })
    return res.status(200).json({ message: "Successfully deleted" });
  }
  else {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

});

//Delete a Spot
router.delete('/:id', async (req, res) => {
  const spot = await Spot.findAll({ where: { id: req.params.id } });
  if (spot) {
    await spot.destroy(); 
    return res.status(200).json(newSpotImage);
  }
  else {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }
});

//Get all Reviews by a Spot's id
router.get('/:id/reviews', async (req, res) => {
  const reviews = await Review.findAll({ 
    where: { spotId: req.params.id } ,
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: ReviewImage, attributes: ['id', 'url'] }
    ],
  });
  if (reviews) return res.status(200).json(reviews);
    return res.status(404).json({ message: "Spot couldn't be found" });
});

//Create a Review for a Spot based on the Spot's id
router.post('/:id/reviews', async (req, res) => {
  const { review,stars } = req.body;

  const spot = await Spot.findAll({ where: { id: req.params.id } });
  if (spot) {
    //fix user id
    const newReview = await Review.create({ review,stars, userId:1 ,spotId: spot.id })
    if (newReview) {
      return res.status(201).json(newReview);
    }
    //validation error check
    return res.status(404).json({ message: "Image was not created" });
  }
  else {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }
});

router.get('/:id/bookings', async (req, res) => {
  const bookings = await Booking.findAll({ where: { spotId: req.params.id } });
  if (bookings) return res.status(200).json(bookings);
});



router.get('/:id/images', async (req, res) => {
  const spotImages = await SpotImage.findAll({ where: { spotId: req.params.id } });
  if (spotImages) return res.status(200).json(spotImages);
});

module.exports = router;