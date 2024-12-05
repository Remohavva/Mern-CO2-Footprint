const mongoose = require('mongoose');

// Define the schema for activities
const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activityType: { type: String, required: true }, // e.g., 'commute', 'energy use'
  value: { type: Number, required: true }, // e.g., distance in km, energy in kWh
  emissionFactor: { type: Number, required: true }, // kg CO₂ per unit
  totalEmissions: { type: Number, required: true }, // Calculated as value * emissionFactor
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Activity', activitySchema);