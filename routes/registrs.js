const express =require('express');
const router=express.Router();
const {models } = require('../models');
const Registr=models.Registr
const CosmetologyReceipt = models.CosmetologyReceipt
const HairdressingReceipt = models.HairdressingReceipt
const CosmetologyService = models.CosmetologyService
const HairdressingService = models.HairdressingService
const Client =models.Client
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
router.post("/",async(req,res)=>{
    const { dateStart, dateEnd, hairdressingReceipts, cosmetologyReceipts } = req.body;

  try {
    const newRegistr = await Registr.create({
      date_start: dateStart,
      date_end: dateEnd,
      total_cost: calculateTotalCost(hairdressingReceipts, cosmetologyReceipts),
    });
    if (hairdressingReceipts && hairdressingReceipts.length > 0) {
      await HairdressingReceipts_Registr.bulkCreate(
        hairdressingReceipts.map(receiptId => ({
          HairdressingReceiptId: receiptId,
          RegistrId: newRegistr.id,
        }))
      );
    }

    if (cosmetologyReceipts && cosmetologyReceipts.length > 0) {
      await CosmetologyReceipts_Registr.bulkCreate(
        cosmetologyReceipts.map(receiptId => ({
          CosmetologyReceiptId: receiptId,
          RegistrId: newRegistr.id,
        }))
      );
    }

    res.json({ message: 'New report created successfully' });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Error creating report' });
  }
})
const calculateTotalCost=async(hairdressingReceipts, cosmetologyReceipts)=> {
    let totalCost = 0;
  
    if (hairdressingReceipts) {
      for (const receiptId of hairdressingReceipts) {
        const receipt = await HairdressingReceipt.findByPk(receiptId);
        totalCost += receipt.total_cost;
      }
    }
  
    if (cosmetologyReceipts) {
      for (const receiptId of cosmetologyReceipts) {
        const receipt = await CosmetologyReceipt.findByPk(receiptId);
        totalCost += receipt.total_cost;
      }
    }
  
    return totalCost;
  }
module.exports=router;