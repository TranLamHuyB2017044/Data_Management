const express = require('express');
const router = express.Router();
const bookedSeatController = require('../controllers/bookedSeat.controller');

// todoList Routes
router.route('/detailseats/:movie_id').post(bookedSeatController.getAllSeat);
router.route('/bookingid/:id').get(bookedSeatController.getByBookingId);

router
    .route('/:id')
    .get(bookedSeatController.getOneSeat)
    .put(bookedSeatController.updateSeat)
    .delete(bookedSeatController.removeSeat);
module.exports = router;
