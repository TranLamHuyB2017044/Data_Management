const sql = require('./db');

const Film = function (film) {
    this.title = film.title;
    this.description = film.description;
    this.poster_url = film.poster_url;
    this.release_date = film.release_date;
    this.duration = film.duration;
    this.category = film.category;
    this.national = film.national;
};
Film.createFilm = (newFilm, cb) => {
    sql.query('insert into movies set ?', newFilm, (err, res) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, newFilm);
        }
    });
};
Film.getAllFilm = (cb) => {
    const query = `select * from movies`;
    sql.query(query, (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};
Film.getFilmById = (id, cb) => {
    const query = `select * from movies where movie_id = ${id}`;
    sql.query(query, (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};
Film.updateById = (id, newFilm, cb) => {
    const query =
        'UPDATE movies SET title=?, description=?, poster_url=?,release_date=?, duration=?, category=?, national=?  WHERE movie_id = ?';
    sql.query(
        query,
        [
            newFilm.title,
            newFilm.description,
            newFilm.poster_url,
            newFilm.release_date,
            newFilm.duration,
            newFilm.category,
            newFilm.national,
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
Film.removeFilm = (id, cb) => {
    const query = 'DELETE FROM movies WHERE movie_id = ?';
    sql.query(query, id, (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};
Film.removeAllFilms = (cb) => {
    const query = 'DELETE FROM movies';
    sql.query(query, (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
};
module.exports = Film;
