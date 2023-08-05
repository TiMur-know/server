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

router.put('/', async (req, res) => {
  const updatedWorkers = req.body;

  try {
    for (const updatedWorker of updatedWorkers) {
      await Worker.update(updatedWorker, { where: { id: updatedWorker.id } });
    }

    res.json({ message: 'Workers updated successfully' });
  } catch (error) {
    console.error('Error updating workers:', error);
    res.status(500).json({ error: 'Error updating workers' });
  }
});

module.exports = router;