const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const contactMiddleware = require('../middleware/contactMiddleware');

router.get('/', contactController.getAll);
router.get('/:id', contactMiddleware.validateGet, contactController.getOne);
router.post('/create', contactMiddleware.validateCreate, contactController.create);
router.put('/:id', contactMiddleware.validateUpdate, contactController.update);
router.delete('/:id', contactMiddleware.validateDelete, contactController.delete);

module.exports = router;
