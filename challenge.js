const express = require('express');
const Challenge = require('../models/Challenge');
const router = express.Router();

// Create a new challenge
router.post('/challenges', async (req, res) => {
  try {
    const newChallenge = new Challenge(req.body);
    await newChallenge.save();
    res.status(201).json(newChallenge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Join a challenge
router.post('/challenges/:challengeId/join', async (req, res) => {
  try {
    const { userId } = req.body;
    const challenge = await Challenge.findById(req.params.challengeId);

    if (!challenge.participants.includes(userId)) {
      challenge.participants.push(userId);
      await challenge.save();
    }

    res.status(200).json({ message: 'Joined challenge successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all challenges
router.get('/challenges', async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;