const express = require('express');
const { Spot, Review, Booking, SpotImage } = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res) => {
  const spots = await Spot.findAll();
  if (spots) return res.status(200).json(spots);
});

router.put('/:id', async (req, res) => {
  const {address,city,state,country,lat,lng,name,description,price} = req.body;

  const spot = await Spot.findAll({ where: { id: req.params.id } });
  if (spot) {
    await spot.update({address,city,state,country,lat,lng,name,description,price})
    return res.status(200).json({message: "Successfully deleted"});
  }
  else {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

});

router.delete('/:id', async (req, res) => {
  const spot = await Spot.findAll({ where: { id: req.params.id } });
  if (spot) {
    await spot.destroy();4
    return res.status(200).json(newSpotImage);
  }
  else {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

});

router.get('/:id/bookings', async (req, res) => {
  const bookings = await Booking.findAll({ where: { spotId: req.params.id } });
  if (bookings) return res.status(200).json(bookings);
});

router.get('/:id/reviews', async (req, res) => {
  const reviews = await Review.findAll({ where: { spotId: req.params.id } });
  if (reviews) return res.status(200).json(reviews);
});

router.get('/:id/images', async (req, res) => {
  const spotImages = await SpotImage.findAll({ where: { spotId: req.params.id } });
  if (spotImages) return res.status(200).json(spotImages);
});

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

module.exports = router;