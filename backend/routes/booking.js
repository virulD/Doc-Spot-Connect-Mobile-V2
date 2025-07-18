const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a new booking
router.post('/', async (req, res) => {
  try {
    console.log('Booking request received:', req.body);
    const booking = new Booking(req.body);
    await booking.save();
    console.log('Booking saved:', booking);
    res.status(201).json(booking);
  } catch (err) {
    console.error('Booking save error:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 