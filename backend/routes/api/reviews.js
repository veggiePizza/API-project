const express = require('express');
const { Reviews, ReviewImage } = require('../../db/models');

const router = express.Router();

router.get('/:id/images', async (req, res) => {
    const images = await ReviewImage.findAll();
    if(images) return res.status(200).json(images);
  });

module.exports = router;