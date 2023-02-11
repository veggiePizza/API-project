const express = require('express');
const { Spot,Booking } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    if(spots) return res.status(200).json(spots);
  });

router.get('/:id/bookings', async (req, res) => {
    const bookings = await Booking.findAll({where: {spotId: req.params.id}});
    if(bookings) return res.status(200).json(bookings);
  });

module.exports = router;