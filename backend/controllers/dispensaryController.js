const Dispensary = require('../models/Dispensary');

exports.getAllDispensaries = async (req, res) => {
  try {
    const dispensaries = await Dispensary.find();
    res.json(dispensaries);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getDispensaryById = async (req, res) => {
  try {
    const dispensary = await Dispensary.findById(req.params.id);
    if (!dispensary) return res.status(404).json({ error: 'Dispensary not found' });
    res.json(dispensary);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addDispensary = async (req, res) => {
  try {
    const dispensary = new Dispensary(req.body);
    await dispensary.save();
    res.status(201).json(dispensary);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.updateDispensary = async (req, res) => {
  try {
    const dispensary = await Dispensary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dispensary) return res.status(404).json({ error: 'Dispensary not found' });
    res.json(dispensary);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.deleteDispensary = async (req, res) => {
  try {
    const dispensary = await Dispensary.findByIdAndDelete(req.params.id);
    if (!dispensary) return res.status(404).json({ error: 'Dispensary not found' });
    res.json({ message: 'Dispensary deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 