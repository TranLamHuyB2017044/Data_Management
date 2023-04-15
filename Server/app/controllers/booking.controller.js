const Booking = require('../models/booking.model');
const QRCode = require('qrcode');

exports.createBooking = async (req, res) => {
    const data = req.body;
    var inforBooking = {
        user_id: data.user_id,
        movie_id: data.movie_id,
        date_book: data.date_book,
        time_book: data.time_book,
        date_start: data.date_start,
        time_start: data.time_start,
        location: data.location,
    };
    var inforSeats = data.seats;
    var newBooking = new Booking(inforBooking);
    console.log(newBooking);
    Booking.createBooking(newBooking, inforSeats, (err, result) => {
        if (err) res.send(err);
        else {
            res.send(result);
        }
    });
};
exports.getAllBooking = (req, res) => {
    Booking.getAllBooking((err, result) => {
        if (err) res.send(err);
        else {
            res.send(result);
        }
    });
};

exports.getOneBooking = (req, res) => {
    Booking.getBookingById(req.params.id, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
};
exports.getBookingByUserId = (req, res) => {
    Booking.getBookingByUserId(req.params.user_id, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
};
exports.updateBooking = (req, res) => {
    Booking.updateById(req.params.id, new Booking(req.body), (err, result) => {
        if (err) res.send(err);
        else if (result > 0) res.send(req.body);
        else res.send({ message: 'Update faily' });
    });
};

exports.removeBooking = (req, res) => {
    Booking.removeBooking(req.params.id, (err, result) => {
        if (err) res.send(err);
        else
            res.send({
                message: `Deleted successfully Booking have id = ${req.params.id}`,
            });
    });
};
