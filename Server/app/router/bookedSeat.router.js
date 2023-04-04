const express = require('express');
const router = express.Router();
const bookedSeatController = require('../controllers/bookedSeat.controller');

// todoList Routes
router
    .route('/')
    .get(bookedSeatController.getAllSeat)
    .post(bookedSeatController.createSeat);

router
    .route('/:id')
    .get(bookedSeatController.getOneSeat)
    .put(bookedSeatController.updateSeat)
    .delete(bookedSeatController.removeSeat);
module.exports = router;
