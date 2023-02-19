const express = require('express');
const { SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

//Delete a Spot Image---requires authorization
router.delete('/:id', requireAuth, async (req, res) => {
  const image = await SpotImage.findAll({ where: { id: req.params.id } });
  if (image) {
    await image.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
  }
  return res.status(404).json({ message: "Spot Image couldn't be found" });
});

module.exports = router;