const User = require('../models/user.model');

exports.getAllUser = (req, res) => {
    User.getAllUser((err, accounts) => {
        if (err) res.send(err);
        else res.send(accounts);
    });
};
exports.removeAllUser = (req, res) => {
    const admin = req.params.admin;
    if (admin === 'true')
        User.removeAllUser((err, result) => {
            if (err) res.send(err);
            else res.send('Deleted all users.');
        });
    else res.status(300).send("You aren't admin.");
};
exports.createUser = (req, res) => {
    var newUser = new User(req.body);
    User.createUser(newUser, (err, result) => {
        if (err) res.status(300).send({ message: err.sqlMessage });
        else res.send(result);
    });
};

exports.getOneUser = (req, res) => {
    const data = req.body;
    // console.log('20', data.username, data.password);
    User.getOneUser(data.username, data.password, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
};
exports.getOneUserById = (req, res) => {
    const id = req.params.id;
    if (isNaN(Number.parseInt(id))) res.send();
    else
        User.getOneUserById(id, (err, result) => {
            if (err) res.send(err);
            else res.send(result);
        });
};
exports.updateUser = (req, res) => {
    User.updateById(req.params.id, new User(req.body), (err, result) => {
        console.log(result);
        if (err) res.send(err);
        if (result > 0) res.send(req.body);
        else res.send({ message: 'Update faily' });
    });
};

exports.removeUser = (req, res) => {
    User.removeUser(req.params.id, (err, task) => {
        if (err) res.send(err);
        else
            res.send({
                message: `Deleted successfully User have id = ${req.params.id}`,
            });
    });
};
exports.removeUserForAdmin = (req, res) => {
    const id = req.params.id;
    const admin = req.params.admin;
    if (admin === 'true')
        User.removeUser(id, (err, task) => {
            if (err) res.send(err);
            else
                res.send({
                    message: `Deleted successfully User have id = ${req.params.id}`,
                });
        });
    else res.status(300).send("You aren't admin.");
};
exports.getAllBookings = (req, res) => {
    const id = req.params.id;
    User.getAllBookings(id, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
};
