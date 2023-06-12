const express = require('express');
const { SpotImage } = require('../../db/models');
const { requireAuth, authModifySpotImage } = require('../../utils/auth');
const router = express.Router();

//Update an Image (additional route)
router.put('/:id', requireAuth, authModifySpotImage, async (req, res) => {
  const { url } = req.body;
  await SpotImage.update({ url }, { where: { id: req.params.id } })
  const spotImage = await SpotImage.findByPk(req.params.id);
  if (spotImage) return res.status(200).json(spotImage);
});

//Delete a Spot Image
router.delete('/:id', requireAuth, authModifySpotImage, async (req, res) => {
  const image = await SpotImage.findByPk(req.params.id);
    await image.destroy();
    return res.status(200).json({ message: "Successfully deleted" , statusCode: 200 });
});

module.exports = router;