const express = require('express');
const { Spot, Review } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    if(spots) return res.status(200).json(spots);
  });

router.get('/:id/reviews', async (req, res) => {
    const reviews = await Review.findAll({where: {spotId:req.params.id}});
    if(reviews) return res.status(200).json(reviews);
  });

module.exports = router;