const express =require('express');
const router=express.Router();
const {models } = require('../models');
const User=models.User;
const Worker = models.Worker
router.get('/check', async (req, res) => {
    try {
      const { username } = req.query;
      const user = await User.findOne({
        where: { username },
      });
  
      res.json({ userExists: !!user });
    } catch (error) {
      console.error('Error checking user:', error);
      res.status(500).json({ error: 'Error checking user' });
    }
  });
router.post('/enter', async (req, res) => {
    try {
    const {username,password} = req.body;
      const user = await User.findOne({
        where: { username, password },
      });
  
      if (user) {
        res.json({ success: true, user });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error entering user:', error);
      res.status(500).json({ error: 'Error entering user' });
    }
  });
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, firstname, lastname, phone, age } = req.body;
      
      const user = await User.create({
        username:username,
        password:password,
        email:email,
        role:'USER'
      });
      const worker = await Worker.create({
        firstname:firstname,
        lastname:lastname,
        phone:phone,
        age:age,
        email:email,
        UserId:user.id
      })
      res.json({ success: true, user, worker });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Error registering user' });
    }
  });
module.exports=router;