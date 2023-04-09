const sql = require('./db');

//Seat object constructor
const Seat = function (seat) {
    this.seat_id = seat.seat_id;
    this.booking_id = seat.booking_id;
};
Seat.createSeat = (newSeat, cb) => {
    const query = `INSERT INTO bookedSeats set ?`;
    sql.query(query, newSeat, (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, newSeat);
        }
    });
};
Seat.getSeatById = (id, cb) => {
    sql.query(
        `Select * from bookedSeats where seat_id = ${id}`,
        (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        },
    );
};
Seat.getAllSeat = (movie_id, cb) => {
    sql.query(
        'Select seat_id from bookings b join bookedSeats bs on bs.booking_id = b.booking_id where movie_id=?',
        movie_id,
        (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        },
    );
};
Seat.updateById = (id, newSeat, cb) => {
    sql.query(
        'UPDATE bookedSeats SET booking_id=? WHERE seat_id = ?',
        [newSeat.booking_id, id],
        (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result.affectedRows);
            }
        },
    );
};
Seat.removeSeat = (id, cb) => {
    sql.query(
        'DELETE FROM bookedSeats WHERE seat_id = ?',
        id,
        (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        },
    );
};

module.exports = Seat;
