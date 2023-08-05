const express =require('express');
const router=express.Router();
const {models } = require('../models');
const User=models.User
console.log('work user')
router.get('/',async(req,res)=>{
    try{
        const users = await User.findAll();
        res.json(users);
    }catch(error){
        console.error('Error fetching users:',error);
        res.status(500).json({error:'Error fetching users'});
    }
});

router.put('/',async(req,res)=>{
    const updatedUsers=req.body;
    try{
        for(const updatedUser of updatedUsers){
            await User.update(updatedUser,{where:{id:updatedUser.id}});
        }
        res.json({message:'Users updated successfully'});
    }catch(error){
        console.error('Error updating users:',error);
        res.status(500).json({error:'Error updating users'});

    }
})
module.exports=router;