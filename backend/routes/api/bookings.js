const express = require('express');
const { Booking, Spot } = require('../../db/models');
const { requireAuth, authBooking, authDeleteBooking, bookingConflict2 } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const router = express.Router();

const validateDate = [
  check('endDate').custom((value, { req }) => {
    if (new Date(value) > new Date(req.body.startDate)) return true;
    return false;
  })
    .withMessage('endDate cannot be on or before startDate'),
  handleValidationErrors
];

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  const bookings = await Booking.findAll({
    where: { userId: user.id },
    attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
    include: [{ model: Spot, attributes: { exclude: ['createdAt', 'updatedAt', 'description'] } }],
  });
  if (bookings) return res.status(200).json({Bookings: bookings});
  return res.status(404).json({ message: "Bookings couldn't be found", status: 404 })
});

//Edit a Booking
router.put('/:id', requireAuth, authBooking, validateDate, bookingConflict2, async (req, res) => {
  const { startDate, endDate } = req.body;
  await Booking.update({ startDate, endDate }, { where: { id: req.params.id } });
  const booking = await Booking.findByPk(req.params.id);
  if (booking) return res.status(200).json(booking);
});

//Delete a Booking
router.delete('/:id', requireAuth, authDeleteBooking, async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  await booking.destroy();
  return res.status(200).json({ message: "Successfully deleted", statusCode: 200 });
});

module.exports = router;