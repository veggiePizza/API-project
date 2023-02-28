const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { requireAuth, authReview } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

let schema;
if (process.env.NODE_ENV === 'production') {
  schema = process.env.SCHEMA;
}

const validateReview = [
  check('review')
    .notEmpty()
    .withMessage('Review text is required'),
  check('stars')
    .notEmpty()
    .isInt({ max: 5, min: 1 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

//Get all Reviews of the Current User--?
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  const reviews = await Review.findAll({
    where: { userId: user.id },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      {
        model: Spot,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{ model: SpotImage, attributes: ['url'] }],
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
      },
      { model: ReviewImage, attributes: ['id', 'url'] },
    ],
  });
  return res.status(200).json({ Reviews: reviews });
});

//Add an Image to a Review based on the Review's id
router.post('/:id/images', requireAuth, authReview, async (req, res) => {
  const { url } = req.body;
  const review = await Review.findByPk(req.params.id);
  const reviewImages = await ReviewImage.findAll({ where: { reviewId: req.params.id } });
  if (Object.keys(reviewImages).length < 10) {
    const newImage = await ReviewImage.create({ url, reviewId: review.id })
    if (newImage) return res.status(200).json({ id: newImage.id, url: newImage.url });
  }
  return res.status(403).json({ message: "Maximum number of images for this resource was reached", statusCode: 403 });
});

//Edit a Review
router.put('/:id', requireAuth, authReview, validateReview, async (req, res) => {
  const { review, stars } = req.body;
  await Review.update({ review, stars }, { where: { id: req.params.id } })
  const newReview = await Review.findByPk(req.params.id);
  return res.status(200).json(newReview);
});

//Delete a Review
router.delete('/:id', requireAuth, authReview, async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  await review.destroy();
  return res.status(200).json({ message: "Successfully Deleted", statusCode: 200 });
});

router.get('/:id/images', async (req, res) => {
  const images = await ReviewImage.findAll();
  if (images) return res.status(200).json(images);
});

module.exports = router;