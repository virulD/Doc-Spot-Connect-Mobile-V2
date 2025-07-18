const express = require('express');
const router = express.Router();
const dispensaryController = require('../controllers/dispensaryController');

router.get('/', dispensaryController.getAllDispensaries);
router.get('/:id', dispensaryController.getDispensaryById);
router.post('/', dispensaryController.addDispensary);
router.put('/:id', dispensaryController.updateDispensary);
router.delete('/:id', dispensaryController.deleteDispensary);

module.exports = router; 