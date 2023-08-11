const express = require('express');
const router = express.Router();
const { models } = require('../models');
const multer = require('multer');
const path = require('path');
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
router.post('/',img.single('photo'), async(req,res)=>{
  const { id, name, description, price, gender, type } = req.body;
  let photoPath = null;

  if (req.file) {
    const imagePath = req.file.path;
    const photoFileName = `${Date.now()}_${path.basename(imagePath)}`;
    photoPath = `img/${type}/${photoFileName}`;

    fs.renameSync(imagePath, photoPath); 
  }

  try {
    if (type === 'cosmetology') {
      if (id) {
        await CosmetologyService.update(
          { name, description, price, photo: photoPath },
          { where: { id } }
        );
      } else {
        await CosmetologyService.create({ name, description, price, photo: photoPath });
      }
    } else if (type === 'hairdressing') {
      if (id) {
        await HairdressingService.update(
          { name, description, price, gender, photo: photoPath },
          { where: { id } }
        );
      } else {
        await HairdressingService.create({ name, description, price, gender, photo: photoPath });
      }
    }

    res.status(200).json({ message: 'Service saved successfully' });
  } catch (error) {
    console.error('Error saving service:', error);
    res.status(500).json({ error: 'Error saving service' });
  }
})
router.put('/edit/:type/:id', img.single('photo'), async (req, res) => {
  const { id, type } = req.params;
  const { name, description, price, gender } = req.body;
  let photoPath = null;

  if (req.file) {
    const imagePath = req.file.path;
    const photoFileName = `${Date.now()}_${path.basename(imagePath)}`;
    photoPath = `img/${type}/${photoFileName}`;

    fs.renameSync(imagePath, photoPath);
  }

  try {
    if (type === 'cosmetology') {
      await CosmetologyService.update(
        { name, description, price, photo: photoPath },
        { where: { id } }
      );
    } else if (type === 'hairdressing') {
      await HairdressingService.update(
        { name, description, price, gender, photo: photoPath },
        { where: { id } }
      );
    }

    res.status(200).json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Error updating service' });
  }
});
router.delete('/:type/:id', async (req, res) => {
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
