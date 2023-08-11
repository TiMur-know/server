const express =require('express');
const router=express.Router();
const {models } = require('../models');
const User=models.User
const { Op } = require('sequelize');
const Worker=models.Worker
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

router.post('/', async (req, res) => {
    let { updatedUsers, updatedWorkers } = req.body;

  try {
    for (const updatedUser of updatedUsers) {
      await User.update(updatedUser, { where: { id: updatedUser.id } });
    }

    for (const updatedWorker of updatedWorkers) {
      await Worker.update(updatedWorker, { where: { id: updatedWorker.id } });

    }


    const userIdsInUpdatedUsers = updatedUsers.map(user => user.id);
    await User.destroy({ where: { id: { [Op.notIn]: userIdsInUpdatedUsers } } });

    const workerIdsInUpdatedWorkers = updatedWorkers.map(worker => worker.id);
    await Worker.destroy({ where: { id: { [Op.notIn]: workerIdsInUpdatedWorkers } } });

    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Error updating data' });
  }
  });
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      await User.destroy({ where: { id: userId } });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Error deleting user' });
    }
  });
module.exports=router;