const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  experience: { type: String, default: 'Not specified' },
  rating: { type: Number, default: 4.5 },
  availableSlots: [{ type: String }],
  image: { type: String, default: '👨‍⚕️' }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema); 