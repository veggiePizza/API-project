const express = require('express');
const { Spot, Review, Booking, SpotImage, User, ReviewImage } = require('../../db/models');
var Sequelize = require("sequelize");
const review = require('../../db/models/review');

const router = express.Router();

//Get all Reviews of the Current User//add an .this?//fix previewImage
router.get('/current', async (req, res) => {
  const reviews = await Review.findAll({
    where: { id: 1 },//heree
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      {
        model: Spot,
        attributes: {include: [],exclude: ['description','createdAt','updatedAt'] },
        include: [{ model: SpotImage, attributes: ['url'] }]
      },
      { model: ReviewImage, attributes: ['id', 'url'] }
    ],
  });
  //********************** reviews is never null
  if (reviews) return res.status(200).json(reviews);
  else return res.status(404).json({ message: "Reviews couldn't be found" })

});

//Add an Image to a Review based on the Review's id
router.post('/:id/images', async (req, res) => {
  const { url } = req.body;
  const review = await Review.findAll({ where: { id: req.params.id } });
  if (review) {
    const newImage = await ReviewImage.create({url})
    if (newImage) {
      return res.status(200).json(newImage);
    }
    //validation error check
    return res.status(404).json({ message: "Image was not created" });
  }
  else {
    return res.status(404).json({ message: "Review couldn't be found" });
  }
});

//Edit a Review
router.put('/:id', async (req, res) => {
  const { review, stars } = req.body;
  const newReview = await Review.findAll({ where: { id: req.params.id } });
  if (newReview) {
    await newReview.update({review,stars})
    return res.status(200).json(newReview);
  }
  else 
    return res.status(404).json({ message: "Review couldn't be found" });
});

//Delete a Review
router.delete('/:id', async (req, res) => {
  const review = await Review.findAll({ where: { id: req.params.id } });
  if (review) {
    await review.destroy(); 
    return res.status(200).json(review);
  }
  else {
    return res.status(404).json({ message: "Review couldn't be found" });
  }
});


router.get('/:id/images', async (req, res) => {
  const images = await ReviewImage.findAll();
  if (images) return res.status(200).json(images);
});


module.exports = router;