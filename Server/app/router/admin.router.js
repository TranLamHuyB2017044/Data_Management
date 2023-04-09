const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const filmController = require('../controllers/film.controller');

// todoList Routes
router
    .route('/deleteUser/:id/:admin')
    .delete(userController.removeUserForAdmin);
router.route('/deleteAllUsers/:admin').delete(userController.removeAllUser);
router.route('/deleteFilm/:id/:admin').delete(filmController.removeFilm);
router.route('/deleteAllFilms/:admin').delete(filmController.removeAllFilms);
router.route('/createFilm/').post(filmController.createFilm);

module.exports = router;
