const express = require('express')
const { sequelize } = require('./models');
const cors = require('cors')

const app=express()
const port = process.env.PORT||3001;

let date = new Date();
console.log(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+":"+date.getMilliseconds())

app.use(cors());

const userRoutes = require('./routes/users')
const workersRoutes=require('./routes/workers');
const clientsRoutes=require('./routes/clients')
const registrsRoutes=require('./routes/registrs')
//const reportsRoutes=require('./routes/reports')
const servicesRoutes=require('./routes/services')

app.use('/api/users',userRoutes);
app.use('/api/workers',workersRoutes);
app.use('/api/registrs',registrsRoutes);
app.use('/api/clients',clientsRoutes);
app.use('/api/services',servicesRoutes);
app.use('/api/clients',clientsRoutes);
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connected to the database!');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  })();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
