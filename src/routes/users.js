const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getOne);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;
