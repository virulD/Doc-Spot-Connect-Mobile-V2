const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
// const timeslotController = require('../controllers/timeslotController');

router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.post('/', doctorController.addDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

// Time slot endpoint removed (now in timeslot.js)

module.exports = router; 