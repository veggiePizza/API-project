const express = require('express');
const { Spot, Review, Booking, SpotImage } = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    if(spots) return res.status(200).json(spots);
  });


router.get('/:id/bookings', async (req, res) => {
    const bookings = await Booking.findAll({where: {spotId: req.params.id}});
    if(bookings) return res.status(200).json(bookings);
 });
  
router.get('/:id/reviews', async (req, res) => {
    const reviews = await Review.findAll({where: {spotId:req.params.id}});
    if(reviews) return res.status(200).json(reviews);
 });

router.get('/:id/images', async (req, res) => {
  const spotImages = await SpotImage.findAll({where: {spotId:req.params.id}});
  if(spotImages) return res.status(200).json(spotImages);
});

module.exports = router;