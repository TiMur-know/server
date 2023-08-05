const express = require('express');
const router = express.Router();
const { models } = require('../models');
const multer = require('multer');

const CosmetologyService = models.CosmetologyService;
const HairdressingService = models.HairdressingService;
const img = multer({ dest: 'img/' });

router.get('/', async (req, res) => {
  try {
    const cosmetologyServices = await CosmetologyService.findAll();
    const hairdressingServices = await HairdressingService.findAll();
    res.json({ cosmetologyServices, hairdressingServices });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Error fetching services' });
  }
});
router.post('/services',img.single('photo'), async(req,res)=>{
    
})
router.delete('/services/:id/:type', async (req, res) => {
    const { id, type } = req.params;
  
    try {
      if (type === 'cosmetology') {
        await CosmetologyService.destroy({ where: { id } });
      } else if (type === 'hairdressing') {
        await HairdressingService.destroy({ where: { id } });
      }
  
      res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ error: 'Error deleting service' });
    }
  });


module.exports = router;
