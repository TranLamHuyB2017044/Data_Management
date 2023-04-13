const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./app/router/user.router');
const filmRouter = require('./app/router/film.router');
const bookingRouter = require('./app/router/booking.router');
const bookedSeatRouter = require('./app/router/bookedSeat.router');

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use('/user', userRouter);
app.use('/film', filmRouter);
app.use('/booking', bookingRouter);
app.use('/bookedseat', bookedSeatRouter);
module.exports = app;
