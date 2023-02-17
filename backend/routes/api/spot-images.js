const express = require('express');
const { SpotImage} = require('../../db/models');
var Sequelize = require("sequelize");
const review = require('../../db/models/review');

const router = express.Router();

//Delete a Spot Image
router.delete('/:id', async (req, res) => {
  const image = await SpotImage.findAll({ where: { id: req.params.id } });
  if (image) {
    await image.destroy(); 
    return res.status(200).json({message: "Successfully deleted"});
  }
  else {
    return res.status(404).json({ message: "Spot Image couldn't be found" });
  }
});


module.exports = router;