const Seat = require('../models/bookedSeat.model');

exports.createSeat = (req, res) => {
    var newSeat = new Seat(req.body);
    Seat.createSeat(newSeat, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
};
exports.getAllSeat = (req, res) => {
    const date = req.body.date_start;
    const time = req.body.time_start;
    const movie_id = req.params.movie_id;
    Seat.getAllSeat(movie_id, date,time, (err, result) => {
        if (err) res.send(err);
        else {
            let arr = result.map((seat) => seat.seat_id);
            res.send(arr);
        }
    });
};
exports.getByBookingId = (req, res) => {
    const bookingId = req.params.id;
    Seat.getSeatByBookingId(bookingId, (err, result) => {
        if (err) res.send(err);
        else {
            let arr = result.map((seat) => seat.seat_id);
            res.send(arr);
        }
    });
};
exports.getOneSeat = (req, res) => {
    Seat.getSeatById(req.params.id, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
};

exports.updateSeat = (req, res) => {
    Seat.updateById(req.params.id, new Seat(req.body), (err, result) => {
        if (err) res.send(err);
        else if (result > 0) res.send(req.body);
        else res.send({ message: 'Update faily' });
    });
};

exports.removeSeat = (req, res) => {
    Seat.removeSeat(req.params.id, (err, result) => {
        if (err) res.send(err);
        else
            res.send({
                message: `Deleted successfully Seat have id = ${req.params.id}`,
            });
    });
};
