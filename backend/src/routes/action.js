const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');
const actionMiddleware = require('../middleware/actionMiddleware');

router.get('/', actionController.getAll);
router.get('/:id', actionMiddleware.validateGet, actionController.getOne);
router.post('/create', actionMiddleware.validateCreate, actionController.create);
router.put('/:id', actionMiddleware.validateUpdate, actionController.update);
router.delete('/:id', actionMiddleware.validateDelete, actionController.delete);

module.exports = router;
