const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Booking, Spot, ReviewImage, Review, SpotImage } = require('../db/models');
const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token;
};

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Authentication required');
  err.title = 'Authentication required';
  err.errors = ['Authentication required'];
  err.status = 401;
  return next(err);
}

const authBooking = async function (req, res, next) {
  const booking = await Booking.findByPk(req.params.id);
  if (booking) {
    if (req.user.id == booking.userId) return next();
    const err = new Error("Booking must belong to the current user")
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }
  const err = new Error("No Booking")
  err.message = "Booking couldn't be found";
  err.status = 404;
  return next(err);
}

const authDeleteBooking = async function (req, res, next) {
  const booking = await Booking.findByPk(req.params.id);
 
  if (booking) {
    today = new Date()
    start = new Date(booking.startDate)
    if (today > start) 
      return res.status(403).json({ message: "Bookings that have been started can't be deleted", statusCode: 403 })
    
    const spot = await Spot.findByPk(booking.spotId);
    if (req.user.id == booking.userId || req.user.id == spot.ownerId) return next();
    const err = new Error("Booking or Spot must belong to the current user")
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }
  const err = new Error("No Booking")
  err.message = "Booking couldn't be found";
  err.status = 404;
  return next(err);
}

const authDeleteReviewImage = async function (req, res, next) {//fix?
  const reviewImage = await ReviewImage.findByPk(req.params.id);
  if (reviewImage) {
    const review = await Review.findByPk(reviewImage.reviewId);
    if (req.user.id == review.userId)
     return next();
    const err = new Error("Review must belong to the current user")
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }
  const err = new Error("No Image")
  err.message = "Review Image couldn't be found";
  err.status = 404;
  return next(err);
}

const authReview = async function (req, _res, next) {
  const review = await Review.findByPk(req.params.id);
  if (review) {
    if (req.user.id == review.userId) return next();
    const err = new Error('Review must belong to the current user');
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }

  const err = new Error("No Review")
  err.message = "Review couldn't be found";
  err.status = 404;
  return next(err);
}

const authModifySpotImage = async function (req, res, next) {
  const spotImage = await SpotImage.findByPk(req.params.id);
  if (spotImage) {
    const spot = await Spot.findByPk(spotImage.spotId);
    if (req.user.id == spot.ownerId) return next();
    const err = new Error("Spot must belong to the current user")
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }
  
  const err = new Error("No Spot Image")
  err.message = "Spot Image couldn't be found";
  err.status = 404;
  return next(err);
}

const authIsSpot = async function (req, _res, next) {
  const spot = await Spot.findByPk(req.params.id);
  if (spot) {
    if (req.user.id == spot.ownerId) return next();
    const err = new Error('Spot must belong to the current user');
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }

  const err = new Error("No Spot")
  err.message = "Spot couldn't be found";
  err.status = 404;
  return next(err);
}

const authIsSpotNot = async function (req, _res, next) {
  const spot = await Spot.findByPk(req.params.id);
  if (spot) {
    if (req.user.id != spot.ownerId) return next();
    const err = new Error('Spot must not belong to the current user');
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
  }

  const err = new Error("No Spot")
  err.message = "Spot couldn't be found";
  err.status = 404;
  return next(err);
}

const authUser = async function (req, res, next) {////check my errors
  const { email, username } = req.body;
  checkUsername = await User.findOne({ where: { username } })
  checkEmail = await User.findOne({ where: { email } })
  if (!(checkUsername || checkEmail)) { return next(); }
  else {
    const errors = {};
    if (checkEmail) errors["email"] = "User with that email already exists";
    if (checkUsername) errors["username"] = "User with that username already exists";
    return res.status(403).json({ message: "User already exists", statusCode: 403, errors: errors })
  }
}

const bookingConflict = async function (req, res, next) {
  const { startDate, endDate } = req.body;
  bookings = await Booking.findAll({ where: { spotId: req.params.id } });
  start = new Date(startDate);
  end = new Date(endDate);
  const errors = {};

  bookings.forEach(el => {
    bookedStart = new Date(el.startDate);
    bookedEnd = new Date(el.endDate);

    if (start >= bookedStart && start <= bookedEnd)
      errors["startDate"] = "Start date conflicts with an existing booking";
    if (end >= bookedStart && end <= bookedEnd)
      errors["endDate"] = "End date conflicts with an existing booking";
  });

  if (Object.keys(errors).length === 0) return next();
  return res.status(403).json({ message: "Sorry, this spot is already booked for the specified dates", statusCode: 403, errors: errors })
}

const bookingConflict2 = async function (req, res, next) {
  const { startDate, endDate } = req.body;
  booking = await Booking.findByPk(req.params.id);
  bookings = await Booking.findAll({ where: { spotId: booking.spotId } });
  start = new Date(startDate);
  end = new Date(endDate);
  today = new Date();
  if (start > today)
    return res.status(403).json({ message: "Past bookings can't be modified", statusCode: 403 })
  
  const errors = {};

  bookings.forEach(el => {
    bookedStart = new Date(el.startDate);
    bookedEnd = new Date(el.endDate);

    if (start >= bookedStart && start <= bookedEnd)
      errors["startDate"] = "Start date conflicts with an existing booking";
    if (end >= bookedStart && end <= bookedEnd)
      errors["endDate"] = "End date conflicts with an existing booking";
  });

  if (Object.keys(errors).length === 0) return next();
  return res.status(403).json({ message: "Sorry, this spot is already booked for the specified dates", statusCode: 403, errors: errors })
}

module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth,
  authBooking,
  authDeleteBooking,
  authDeleteReviewImage,
  authReview,
  authModifySpotImage,
  authIsSpot,
  authIsSpotNot,
  authUser,
  bookingConflict,
  bookingConflict2
};