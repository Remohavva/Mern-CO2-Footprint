const express = require('express');
const EmissionFactor = require('../models/EmissionFactor');
const router = express.Router();

// Add or update emission factors
router.post('/emission-factors', async (req, res) => {
  try {
    const { activityType, factor } = req.body;
    let emissionFactor = await EmissionFactor.findOne({ activityType });

    if (emissionFactor) {
      emissionFactor.factor = factor;
    } else {
      emissionFactor = new EmissionFactor({ activityType, factor });
    }

    await emissionFactor.save();
    res.status(200).json(emissionFactor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all emission factors
router.get('/emission-factors', async (req, res) => {
  try {
    const factors = await EmissionFactor.find();
    res.json(factors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;