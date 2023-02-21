const express = require('express');
const { SpotImage } = require('../../db/models');
const { requireAuth, authDeleteSpotImage } = require('../../utils/auth');
const router = express.Router();

//Delete a Spot Image
router.delete('/:id', requireAuth, authDeleteSpotImage, async (req, res) => {
  const image = await SpotImage.findByPk(req.params.id);
    await image.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;