const mongoose = require('mongoose');

// Define schema for emission factors
const emissionFactorSchema = new mongoose.Schema({
  activityType: { type: String, required: true }, // e.g., 'car', 'bus'
  factor: { type: Number, required: true }, // Emission factor (kg CO₂/unit)
});

module.exports = mongoose.model('EmissionFactor', emissionFactorSchema);