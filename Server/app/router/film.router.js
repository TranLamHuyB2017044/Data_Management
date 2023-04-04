const express = require('express');
const router = express.Router();
const filmController = require('../controllers/film.controller');

// todoList Routes
router
    .route('/')
    .get(filmController.getAllFilm)
    .post(filmController.createFilm)
    .delete(filmController.removeAllFilms);

router
    .route('/:id')
    .get(filmController.getOneFilm)
    .put(filmController.updateFilm)
    .delete(filmController.removeFilm);
module.exports = router;
