const express =require('express');
const router=express.Router();
const {models } = require('../models');
const Registr=models.Registr
const CosmetologyReceipt = models.CosmetologyReceipt
const HairdressingReceipt = models.HairdressingReceipt
console.log('work reg')
router.get('/',async(req,res)=>{
    try{
        
        const registrs=await Registr.findAll({
            include:[
                {model:CosmetologyReceipt, as: 'cosmetologyReceipts'},
                {model:HairdressingReceipt, as: 'hairdressingReceipts'},
            ]
        })
        res.json(registrs);
    }catch(error){
        console.error('Error fetching users:',error);
        res.status(500).json({error:'Error fetching users'});
    }
});

module.exports=router;