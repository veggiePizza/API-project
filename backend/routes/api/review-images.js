const express = require('express');
const { ReviewImage} = require('../../db/models');
var Sequelize = require("sequelize");
const review = require('../../db/models/review');

const router = express.Router();

//Delete a Review Image
router.delete('/:id', async (req, res) => {
  const image = await ReviewImage.findAll({ where: { id: req.params.id } });
  if (image) {
    await image.destroy(); 
    return res.status(200).json({message: "Successfully deleted"});
  }
  else {
    return res.status(404).json({ message: "Review Image couldn't be found" });
  }
});


module.exports = router;