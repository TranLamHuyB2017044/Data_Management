const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { route } = require('./user.router');

// todoList Routes
router
    .route('/')
    .get(bookingController.getAllBooking)
    .post(bookingController.createBooking);
router.route('/user/:user_id').get(bookingController.getBookingByUserId);
router
    .route('/:id')
    .get(bookingController.getOneBooking)
    .put(bookingController.updateBooking)
    .delete(bookingController.removeBooking);
module.exports = router;
