var mysql = require('mysql2');

//local mysql db connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'movie_booking',
});
// connect to database
connection.connect(function (err) {
    if (err) console.log(err);
    else console.log('Successfully connection to the database.');
});

module.exports = connection;
