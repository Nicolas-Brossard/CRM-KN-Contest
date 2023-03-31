const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const todoMiddleware = require('../middleware/todoMiddleware');

router.get('/', todoController.getAll);
router.get('/:id', todoMiddleware.validateGet, todoController.getOne);
router.post('/create', todoMiddleware.validateCreate, todoController.create);
router.put('/:id', todoMiddleware.validateUpdate, todoController.update);
router.delete('/:id', todoMiddleware.validateDelete, todoController.delete);

module.exports = router;
