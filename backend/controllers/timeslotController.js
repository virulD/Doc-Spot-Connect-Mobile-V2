const Doctor = require('../models/Doctor');
const Booking = require('../models/Booking');
const TimeSlot = require('../models/TimeSlot');

exports.getNextAvailableTimeSlots = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    // Return the availableSlots array
    res.json(doctor.availableSlots || []);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * @api {get} /api/timeslots/next-available/:doctorId/:dispensaryId Get next available time slots (from timeslotconfigs)
 * @apiName GetNextAvailableTimeSlotsByDoctorAndDispensary
 * @apiGroup TimeSlotConfig
 *
 * @apiParam {String} doctorId Doctor's unique ID.
 * @apiParam {String} dispensaryId Dispensary's unique ID.
 *
 * @apiSuccess {Boolean} available Whether there are available slots.
 * @apiSuccess {Object[]} availableDays List of available days and slots.
 * @apiSuccess {Number} totalAvailableDays Number of days with available slots.
 *
 * @apiDescription
 * Fetches available time slots for a doctor and dispensary from the timeslotconfigs collection only.
 */
exports.getNextAvailableTimeSlotsByDoctorAndDispensary = async (req, res) => {
  const { doctorId, dispensaryId } = req.params;
  try {
    const mongoose = require('mongoose');
    const timeslotConfigs = await mongoose.connection.db.collection('timeslotconfigs').find({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      dispensaryId: new mongoose.Types.ObjectId(dispensaryId)
    }).toArray();
    if (!timeslotConfigs.length) {
      return res.json({ available: false, availableDays: [], totalAvailableDays: 0 });
    }
    const Booking = require('../models/Booking');
    const today = new Date();
    const availableDays = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay();
      const dateString = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const slotsForDay = timeslotConfigs.filter(slot => slot.dayOfWeek === dayOfWeek);
      for (const slot of slotsForDay) {
        // Count bookings for this slot on this date
        const bookingsDone = await Booking.countDocuments({
          doctorId,
          dispensaryId,
          bookingDate: { $gte: new Date(dateString + 'T00:00:00.000Z'), $lte: new Date(dateString + 'T23:59:59.999Z') },
          timeSlot: { $gte: slot.startTime, $lte: slot.endTime }
        });
        const isFullyBooked = bookingsDone >= slot.maxPatients;
        const remainingSlots = Math.max(slot.maxPatients - bookingsDone, 0);
        const nextAppointmentNumber = bookingsDone + 1;
        availableDays.push({
          date: dateString,
          dayName,
          startTime: slot.startTime,
          endTime: slot.endTime,
          bookingsDone,
          nextAppointmentNumber,
          maxPatients: slot.maxPatients,
          minutesPerPatient: slot.minutesPerPatient,
          sessionInfo: {
            startTime: slot.startTime,
            endTime: slot.endTime,
            minutesPerPatient: slot.minutesPerPatient,
            maxPatients: slot.maxPatients
          },
          isModified: false, // You can update this logic if you track modifications
          isFullyBooked,
          remainingSlots
        });
      }
    }
    const filteredAvailableDays = availableDays.filter(day => day.remainingSlots > 0);
    res.json({
      available: filteredAvailableDays.length > 0,
      availableDays: filteredAvailableDays,
      totalAvailableDays: filteredAvailableDays.length
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 