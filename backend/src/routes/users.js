const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userMiddleware = require('../middleware/userMiddleware');

router.get('/', userController.getAll);
router.get('/:id', userMiddleware.validateGet, userController.getOne);
router.post('/create', userMiddleware.validateCreate, userController.create);
router.put('/:id', userMiddleware.validateUpdate, userController.update);
router.delete('/:id', userMiddleware.validateDelete, userController.delete);

module.exports = router;
