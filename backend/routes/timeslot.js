const express = require('express');
const router = express.Router();
const timeslotController = require('../controllers/timeslotController');

// GET /api/timeslots/next-available/:doctorId/:dispensaryId
router.get('/next-available/:doctorId/:dispensaryId', timeslotController.getNextAvailableTimeSlotsByDoctorAndDispensary);
// GET /api/timeslots/next-available/:doctorId
router.get('/next-available/:doctorId', timeslotController.getNextAvailableTimeSlots);

module.exports = router; 