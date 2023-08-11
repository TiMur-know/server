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
router.post('/', async (req, res) => {
    const { selectedService, selectedClient, isEditClient, clientData } = req.body;
    try {
        let receiptData = {
        date_time: new Date(),  
        total_cost: selectedService.price, 
        };

        if (isEditClient) {
        const { lastname, firstname, age, email, phone } = clientData;
        let updatedClient;

        if (selectedClient) {
            updatedClient = await Client.update(
            { lastname, firstname, age, email, phone },
            { where: { id: selectedClient.id } }
            );
        } else {
            updatedClient = await Client.create({ lastname, firstname, age, email, phone });
            receiptData.ClientId = updatedClient.id;
        }
        }

        if (selectedService.type === 'Косметология') {
        const cosmetologyReceipt = await CosmetologyReceipt.create(receiptData);
        await cosmetologyReceipt.setCosmetologyService(selectedService.id);
        if (selectedClient) {
            await cosmetologyReceipt.setClient(selectedClient.id);
        }
        } else if (selectedService.type === 'Перукарня') {
        const hairdressingReceipt = await HairdressingReceipt.create(receiptData);
        await hairdressingReceipt.setHairdressingService(selectedService.id);
        if (selectedClient) {
            await hairdressingReceipt.setClient(selectedClient.id);
        }
        }
        res.json({ message: 'Order saved successfully' });
    } catch (error) {
      console.error('Error saving order:', error);
      res.status(500).json({ error: 'Error saving order' });
    }
  });
module.exports = router;
