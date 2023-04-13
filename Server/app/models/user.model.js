const sql = require('./db');

//User object constructor
const User = function (user) {
    this.name = user.name;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
};
User.createUser = (newUser, cb) => {
    const query = `INSERT INTO users set ?`;
    sql.query(query, newUser, (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, newUser);
        }
    });
};
User.getOneUser = (username, password, cb) => {
    let query = `Select * from users where username =? and password=?`;
    sql.query(query, [username, password], (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};
User.getAllUser = (cb) => {
    sql.query('Select * from users', (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};
User.removeAllUser = (cb) => {
    sql.query('Delete from users', (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result.affectedRows);
        }
    });
};
User.updateById = (id, newUser, cb) => {
    sql.query(
        'UPDATE users SET name=?, username=?, password=?, email=?  WHERE user_id = ?',
        [newUser.name, newUser.username, newUser.password, newUser.email, id],
        (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result.affectedRows);
            }
        },
    );
};
User.removeUser = (id, cb) => {
    sql.query('call removeUser(?)', id, (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};
User.getOneUserById = (id, cb) => {
    sql.query(
        'select * from users where user_id = ? limit 1',
        id,
        (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                if (result.length === 0) cb(null, null);
                else cb(null, result[0]);
            }
        },
    );
};
User.getAllBookings = (id, cb) => {
    sql.query('call showBookings(?)', id, (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};
module.exports = User;
