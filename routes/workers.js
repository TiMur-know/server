const express = require('express');
const router = express.Router();
const { models } = require('../models');
const Worker=models.Worker
console.log('work work')
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.findAll();
    res.json(workers);
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ error: 'Error fetching workers' });
  }
});
module.exports = router;