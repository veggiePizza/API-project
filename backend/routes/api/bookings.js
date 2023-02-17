const express = require('express');
const { Booking, Spot } = require('../../db/models');

const router = express.Router();
/*
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    if(spots) return res.status(200).json(spots);
  });
*/


//Get all of the Current User's Bookings
router.get('/current', async (req, res) => {
  const bookings = await Booking.findAll({
    where: { id: 1 },
    attributes: ['id','spotId','userId','startDate','endDate','createdAt','updatedAt'],
    include: [{model: Spot, attributes: {exclude: ['createdAt','updatedAt','description']}}]
    
  });
  //********************** reviews is never null
  if (bookings) return res.status(200).json(bookings);
  else return res.status(404).json({ message: "Bookings couldn't be found" })

});


//Edit a Booking
router.put('/:id', async (req, res) => {
  const { startDate, endDate } = req.body;
  const bookings = await Booking.update({ startDate, endDate},{ where: { id: req.params.id } });
  if (bookings){
    return res.status(200).json(bookings);
  } 
  else return res.status(404).json({ message: "Spot couldn't be found" })

});


//Delete a Booking
router.delete('/:id', async (req, res) => {
  const booking = await Booking.findAll({ where: { id: req.params.id } });
  if (booking) {
    await booking.destroy(); 
    return res.status(200).json({message: "Successfully deleted"});
  }
  else {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }
});

module.exports = router;