const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  patientId: String,
  doctorId: String,
  dispensaryId: String,
  bookingDate: Date,
  timeSlot: String,
  appointmentNumber: Number,
  estimatedTime: String,
  status: String,
  symptoms: String,
  isPaid: Boolean,
  isPatientVisited: Boolean,
  patientName: String,
  patientPhone: String,
  patientEmail: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema); 