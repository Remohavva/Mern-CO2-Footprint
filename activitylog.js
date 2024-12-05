const express = require('express');
const Activity = require('../models/Activity');
const router = express.Router();

// Log a new activity
router.post('/activities', async (req, res) => {
  try {
    const { userId, activityType, value, emissionFactor } = req.body;

    // Calculate total emissions
    const totalEmissions = value * emissionFactor;

    const newActivity = new Activity({
      userId,
      activityType,
      value,
      emissionFactor,
      totalEmissions,
    });

    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all activities for a user
router.get('/activities/:userId', async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;