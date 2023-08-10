const express = require('express');
const router = express.Router();
const { models } = require('../models');

const CosmetologyService = models.CosmetologyService;
const HairdressingService = models.HairdressingService;
const CosmetologyReceipt = models.CosmetologyReceipt;
const HairdressingReceipt = models.HairdressingReceipt;
const Client = models.Client;
router.get('/', async (req, res) => {
  try {
    const cosmetologyReceipt = await CosmetologyReceipt.findAll({
        include: [
          { model: Client, as: "Client", attributes: ['firstname', 'lastname'] },
          { model: CosmetologyService, as: "CosmetologyService", attributes: ['name'] },
        ],
      });
    const hairdressingReceipt = await HairdressingReceipt.findAll({
        include: [
          { model: Client, as: "Client", attributes: ['firstname', 'lastname'] },
          { model: HairdressingService, as: "HairdressingService", attributes: ['name'] },
        ],
      });
    res.json({ cosmetologyReceipt, hairdressingReceipt });

  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Error fetching services' });
  }
});

module.exports = router;
