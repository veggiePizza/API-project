const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

const authReview = async function (req, _res, next) {
  const review = await Review.findByPk(req.params.id);
  if (req.user.id == review.userId) return next();
  const err = new Error('Review must belong to the current user');
  err.message = 'Forbidden';
  err.status = 403;
  return next(err);
}

//Get all Reviews of the Current User
router.get('/current', async (req, res) => {
  const { user } = req;
  const reviews = await Review.findAll({
    where: { userId: user.id },//heree
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      {
        model: Spot,
        attributes: { include: [], exclude: ['description', 'createdAt', 'updatedAt'] },
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
router.post('/:id/images', requireAuth, authReview, async (req, res) => {
  const { url } = req.body;
  const review = await Review.findAll({ where: { id: req.params.id } });
  if (review) {
    const newImage = await ReviewImage.create({ url })
    if (newImage) return res.status(200).json(newImage);
    return res.status(404).json({ message: "Image was not created" });
  }
  else
    return res.status(404).json({ message: "Review couldn't be found" });
});

//Edit a Review
router.put('/:id', requireAuth, authReview, async (req, res) => {
  const { review, stars } = req.body;
  const newReview = await Review.findAll({ where: { id: req.params.id } });
  if (newReview) {
    await newReview.update({ review, stars })
    return res.status(200).json(newReview);
  }
  return res.status(404).json({ message: "Review couldn't be found" });
});

//Delete a Review
router.delete('/:id', requireAuth, authReview, async (req, res) => {
  const review = await Review.findAll({ where: { id: req.params.id } });
  if (review) {
    await review.destroy();
    return res.status(200).json(review);
  }
  return res.status(404).json({ message: "Review couldn't be found" });
});

router.get('/:id/images', async (req, res) => {
  const images = await ReviewImage.findAll();
  if (images) return res.status(200).json(images);
});

module.exports = router;