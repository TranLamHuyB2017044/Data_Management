const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// todoList Routes
router.route('/login').post(userController.getOneUser);
router
    .route('/')
    .get(userController.getAllUser)
    .post(userController.createUser)
    .delete(userController.removeAllUser);
router
    .route('/:id')
    .get(userController.getOneUserById)
    .put(userController.updateUser)
    .delete(userController.removeUser);
module.exports = router;
