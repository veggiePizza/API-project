const express = require('express');
const { ReviewImage } = require('../../db/models');
const { requireAuth, authDeleteReviewImage } = require('../../utils/auth');
const router = express.Router();

//Delete a Review Image
router.delete('/:id', requireAuth, authDeleteReviewImage, async (req, res) => {
    const image = await ReviewImage.findByPk(req.params.id);
    await image.destroy();
    return res.status(200).json({ message: "Successfully deleted" , statusCode: 200 });
});

module.exports = router;