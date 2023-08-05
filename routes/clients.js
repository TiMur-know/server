const express =require('express');
const router=express.Router();
const {models } = require('../models');
const Client=models.Client
console.log('work user')
router.get('/',async(req,res)=>{
    try{
        const clients = await Client.findAll();
        res.json(clients);
    }catch(error){
        console.error('Error fetching clients:',error);
        res.status(500).json({error:'Error fetching clients'});
    }
});
module.exports=router;