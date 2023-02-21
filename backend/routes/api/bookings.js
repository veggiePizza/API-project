const express = require('express');
const { Booking, Spot } = require('../../db/models');
const { requireAuth, authBooking, authDeleteBooking } = require('../../utils/auth');
const router = express.Router();

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  const bookings = await Booking.findAll({
    where: { userId: user.id },
    attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
    include: [{ model: Spot, attributes: { exclude: ['createdAt', 'updatedAt', 'description'] } }]
  });
  if (bookings) return res.status(200).json(bookings);
  return res.status(404).json({ message: "Bookings couldn't be found", status: 404 })
});

//Edit a Booking--Body validation
router.put('/:id', requireAuth, authBooking, async (req, res) => {
  const { startDate, endDate } = req.body;
  await Booking.update({ startDate, endDate }, { where: { id: req.params.id } });
  const booking = await Booking.findByPk(req.params.id);
  if (booking) return res.status(200).json(booking);
});

//Delete a Booking
router.delete('/:id', requireAuth, authDeleteBooking, async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  await booking.destroy();
  return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;