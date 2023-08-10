const express =require('express');
const router=express.Router();
const {models } = require('../models');
const Registr=models.Registr
const CosmetologyReceipt = models.CosmetologyReceipt
const HairdressingReceipt = models.HairdressingReceipt
const CosmetologyService = models.CosmetologyService
const HairdressingService = models.HairdressingService
const Client =models.Client
console.log('work reg')
router.get('/', async (req, res) => {
    try {
        const registrs = await Registr.findAll({
            include: [
              {
                model: CosmetologyReceipt,
                include: [
                    { model: Client,as:"Client", attributes: ['firstname', 'lastname'] },
                    { model: CosmetologyService, attributes: ['name'] }],
            },
              {
                model: HairdressingReceipt,
                include: [{ model: Client,as:"Client", attributes: ['firstname', 'lastname'] },
                { model: HairdressingService, attributes: ['name'] }
            ],
              },
            ],
          });
          res.json(registrs);
    } catch (error) {
        console.error('Error fetching registrs:', error);
        res.status(500).json({ error: 'Error fetching registrs', details: error.message });
      }
      
});

module.exports=router;