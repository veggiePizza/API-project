const express = require('express');
const { Booking, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

const authBooking = async function (req, _res, next) {
  const booking = await Booking.findByPk(req.params.id);
  if (req.user.id == booking.userId) return next();
  const err = new Error('Booking must belong to the current user');
  err.message = 'Forbidden';
  err.status = 403;
  return next(err);
}

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
  const {user} = req;
  const bookings = await Booking.findAll({
    where: { userId: user.id },
    attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
    include: [{ model: Spot, attributes: { exclude: ['createdAt', 'updatedAt', 'description'] } }]
  });
  if (bookings) return res.status(200).json(bookings);
  return res.status(404).json({ message: "Bookings couldn't be found" })
});

//Edit a Booking
router.put('/:id', requireAuth, authBooking, async (req, res) => {
  const { startDate, endDate } = req.body;
  const bookings = await Booking.update({ startDate, endDate }, { where: { id: req.params.id } });
  if (bookings) return res.status(200).json(bookings);
  return res.status(404).json({ message: "Spot couldn't be found" })
});

//Delete a Booking
router.delete('/:id', requireAuth,authBooking, async (req, res) => {
  const booking = await Booking.findAll({ where: { id: req.params.id } });
  if (booking) {
    await booking.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
  }
  return res.status(404).json({ message: "Booking couldn't be found" });
});

router.use(async (err, req, res, next) => {
  const booking = await Booking.findByPk(req.params.id);
  const spot = await Spot.findByPk(booking.spotId);
  if (req.user.id == spot.ownerId) return next();
  err.message = "lol you thought"
  return next(err);
})

module.exports = router;