const Film = require('../models/film.model');

exports.getAllFilm = (req, res) => {
    Film.getAllFilm((err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
};

exports.createFilm = (req, res) => {
    var newFilm = new Film(req.body);
    Film.createFilm(newFilm, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
};

exports.getOneFilm = (req, res) => {
    Film.getFilmById(req.params.id, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
};

exports.updateFilm = (req, res) => {
    Film.updateById(req.params.id, new Film(req.body), (err, result) => {
        if (err) res.send(err);
        else if (result > 0) res.send(req.body);
        else res.send({ message: 'Update faily' });
    });
};

exports.removeFilm = (req, res) => {
    Film.removeFilm(req.params.id, (err, result) => {
        if (err) res.send(err);
        else
            res.send({
                message: `Deleted successfully Film have id = ${req.params.id}`,
            });
    });
};

exports.removeAllFilms = (req, res) => {
    Film.removeAllFilms((err, result) => {
        if (err) res.send(err);
        else
            res.send({
                message: `Deleted successfully all films`,
            });
    });
};
