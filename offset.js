const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Add a new project
router.post('/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Contribute to a project
router.post('/projects/:projectId/contribute', async (req, res) => {
  try {
    const { userId, contribution } = req.body;
    const project = await Project.findById(req.params.projectId);

    project.totalFunds += contribution;
    project.contributors.push({ userId, contribution });
    await project.save();

    res.status(200).json({ message: 'Contribution successful', project });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;