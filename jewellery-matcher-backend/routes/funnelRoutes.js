const express = require('express');
const router = express.Router();
const Funnel = require('../models/Funnel');

// Create a new funnel entry
router.post('/funnel', async (req, res) => {
  try {
    console.log('Received funnel data:', req.body);
    const newFunnel = new Funnel(req.body);
    console.log('Created new Funnel document:', newFunnel);
    const savedFunnel = await newFunnel.save();
    console.log('Saved funnel data:', savedFunnel);
    res.status(201).json(savedFunnel);
  } catch (error) {
    console.error('Error saving funnel data:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
});


// Get all funnel entries
router.get('/', async (req, res) => {
  try {
    const funnels = await Funnel.find();
    console.log('Retrieved funnels:', funnels);
    res.json(funnels);
  } catch (error) {
    console.error('Error fetching funnels:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get a specific funnel entry
router.get('/:id', async (req, res) => {
  try {
    const funnel = await Funnel.findById(req.params.id);
    if (!funnel) return res.status(404).json({ message: 'Funnel entry not found' });
    res.json(funnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a funnel entry
router.patch('/:id', async (req, res) => {
  try {
    const updatedFunnel = await Funnel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFunnel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a funnel entry
router.delete('/:id', async (req, res) => {
  try {
    await Funnel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Funnel entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;