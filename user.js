const mongoose = require('mongoose');

// Define the schema for users
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'business', 'admin'], default: 'user' },
  profile: {
    dietType: { type: String, default: 'omnivore' },
    transportationMode: { type: String, default: 'car' },
    averageEnergyUse: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);