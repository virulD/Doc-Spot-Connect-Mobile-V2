const mongoose = require('mongoose');

const dispensarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  distance: { type: String, default: 'Not specified' },
  rating: { type: Number, default: 4.5 },
  isOpen: { type: Boolean, default: true },
  phone: { type: String, default: 'Not specified' },
  services: [{ type: String }],
  image: { type: String, default: '🏥' }
}, { timestamps: true });

module.exports = mongoose.model('Dispensary', dispensarySchema); 