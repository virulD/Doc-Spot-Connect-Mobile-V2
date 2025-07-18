const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  dispensaryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dispensary', required: true },
  dayOfWeek: { type: Number, required: true }, // 0=Sunday, 1=Monday, ...
  startTime: { type: String, required: true }, // e.g., '14:00'
  endTime: { type: String, required: true },   // e.g., '17:00'
  maxPatients: { type: Number, required: true },
  minutesPerPatient: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('TimeSlot', timeSlotSchema); 