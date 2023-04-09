const sql = require('./db');
const QRCode = require('qrcode');

var createQR = function (booking) {
    var segs = [
        { data: booking.user_id, mode: 'numeric' },
        { data: booking.movie_id, mode: 'numeric' },
        { data: booking.date, mode: 'alphanumeric' },
        { data: booking.time, mode: 'alphanumeric' },
        { data: booking.location, mode: 'byte' },
    ];
    QRCode.toDataURL(segs, function (err, url) {
        console.log(12, url);
        if (err) console.log(err);
        else return url;
    });
};
//Booking object constructor
const Booking = function (booking) {
    this.user_id = booking.user_id;
    this.movie_id = booking.movie_id;
    this.date = booking.date;
    this.time = booking.time;
    this.location = booking.location;
};
Booking.createBooking = (newBooking, seats, cb) => {
    const query = `call movie_booking(?,?,?,?,?,?)`;
    var data = [];
    seats.forEach((seat) => {
        let newB = [
            newBooking.user_id,
            newBooking.movie_id,
            newBooking.date,
            newBooking.time,
            newBooking.location,
            seat,
        ];
        data.push(newB);
    });
    try {
        data.forEach((d) => {
            sql.query(query, d, (err, result) => {});
        });
        cb(null, 'Booking seccessfully');
    } catch (err) {
        cb(err, null);
    }
};
Booking.getBookingById = (id, cb) => {
    sql.query(
        `Select * from bookings where booking_id = ${id}`,
        (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        },
    );
};
Booking.getBookingByUserId = (id, cb) => {
    sql.query(`Select * from bookings where user_id = ${id}`, (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};
Booking.getAllBooking = (cb) => {
    sql.query('Select * from bookings', (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};
Booking.updateById = (id, newBooking, cb) => {
    sql.query(
        'UPDATE bookings SET user_id=?, movie_id=?, date=?, time=?  WHERE booking_id = ?',
        [
            newBooking.user_id,
            newBooking.movie_id,
            newBooking.date,
            newBooking.time,
            id,
        ],
        (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result.affectedRows);
            }
        },
    );
};
Booking.removeBooking = (id, cb) => {
    sql.query('call removeBooking(?)', id, (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};

module.exports = Booking;
