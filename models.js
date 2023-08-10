const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'database.sqlite'
})
const User =sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false
    }
});
const Worker =sequelize.define('Worker',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstname:{
        type: DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER
    },
    email:{
        type:DataTypes.STRING
    }
})
const Client =sequelize.define('Client',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:null
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:null
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
const CosmetologyService=sequelize.define('CosmetologyService',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
    photo: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
    },
    show: {
        type: DataTypes.BOOLEAN,
    },
})
const HairdressingService = sequelize.define('HairdressingService', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    show: {
      type: DataTypes.BOOLEAN,
    },
}); 
const CosmetologyReceipt = sequelize.define('CosmetologyReceipt', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date_time: {
      type: DataTypes.DATE,
    },
    total_cost: {
      type: DataTypes.FLOAT,
    },
});
const HairdressingReceipt = sequelize.define('HairdressingReceipt', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date_time: {
      type: DataTypes.DATE,
    },
    total_cost: {
      type: DataTypes.FLOAT,
    },
});
const Registr = sequelize.define('Registr', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date_start: {
      type: DataTypes.DATE,
    },
    date_end: {
      type: DataTypes.DATE,
    },
    total_cost: {
      type: DataTypes.FLOAT,
    }
});

const HairdressingReceipts_Registr=sequelize.define('HairdressingReceipts_Registr',{
  id:{
    type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },

});
const CosmetologyReceipts_Registr=sequelize.define('CosmetologyReceipts_Registr',{
  id:{
    type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },

});
User.hasMany(Worker);
Worker.belongsTo(User);

CosmetologyService.hasMany(CosmetologyReceipt);
CosmetologyReceipt.belongsTo(CosmetologyService);

HairdressingService.hasMany(HairdressingReceipt);
HairdressingReceipt.belongsTo(HairdressingService);

Client.hasMany(CosmetologyReceipt);
CosmetologyReceipt.belongsTo(Client, { as: 'Client' });

Client.hasMany(HairdressingReceipt);
HairdressingReceipt.belongsTo(Client, { as: 'Client' });

HairdressingReceipt.belongsToMany(Registr, { through: HairdressingReceipts_Registr });
Registr.belongsToMany(HairdressingReceipt, { through: HairdressingReceipts_Registr });

CosmetologyReceipt.belongsToMany(Registr, { through: CosmetologyReceipts_Registr });
Registr.belongsToMany(CosmetologyReceipt, { through: CosmetologyReceipts_Registr });

const add_test=async()=>{
    const testUsers = [
        { username: 'user1', email: 'user1@example.com', password: 'password1', role: 'USER' },
        { username: 'user2', email: 'user2@example.com', password: 'password2', role: 'USER' },
        // ...другие пользователи
      ];
  
      const testWorkers = [
        { firstname: 'John', lastname: 'Doe', phone: '1234567890', age: 30,UserId:1 },
        { firstname: 'Jane', lastname: 'Doe', phone: '9876543210', age: 25,UserId:2 },
        // ...другие работники
      ];
  
      const testClients = [
        { firstname: 'FirstName1', lastname: 'Lastname1', phone: '1111111111', age: 28, email: 'client1@example.com' },
        { firstname: 'FirstName2', lastname: 'Lastname2', phone: '2222222222', age: 35, email: 'client2@example.com' },
        // ...другие клиенты
      ];
  
      const testCosmetologyServices = [
        { name: 'Service1', description: 'Description1', price: 50.00, show: true,photo:"/img/cosmetology/test2.jfif" },
        { name: 'Service2', description: 'Description2', price: 75.00, show: true },
        // ...другие косметологические услуги
      ];
  
      const testHairdressingServices = [
        { name: 'Service3', description: 'Description3', price: 40.00, show: true,photo:"/img/hairdressing/test.jpg" },
        { name: 'Service4', description: 'Description4', price: 60.00, show: true },
        // ...другие парикмахерские услуги
      ];
  
      const testHairdressingReceipts = [
        { date_time: '2023-08-03 14:00:00', total_cost: 40.00, HairdressingServiceId: 1, ClientId: 2 },
        { date_time: '2023-08-04 11:45:00', total_cost: 60.00, HairdressingServiceId: 1, ClientId: 1 },
        // ...другие парикмахерские квитанции
      ];
      
      const testCosmetologyReceipts = [
        { date_time: '2023-08-01 10:00:00', total_cost: 50.00, CosmetologyServiceId: 2, ClientId: 2 },
        { date_time: '2023-08-02 15:30:00', total_cost: 75.00, CosmetologyServiceId: 1, ClientId: 2 },
        // ...другие косметологические квитанции
      ];
      const testHairdressingReceipts_Registr = [
        { HairdressingReceiptId: 1, RegistrId: 1 },
        { HairdressingReceiptId: 2, RegistrId: 2 },
      ];
    
      const testCosmetologyReceipts_Registr = [
        { CosmetologyReceiptId: 1, RegistrId: 1 },
        { CosmetologyReceiptId: 2, RegistrId: 1 },
        { CosmetologyReceiptId: 2, RegistrId: 2 },
      ];
      const testRegistrs = [
        { date_start: '2023-08-01', date_end: '2023-08-04', total_cost: 165.00},
        { date_start: '2023-08-03', date_end: '2023-08-12', total_cost: 135.00 },
      ];
    await models.User.bulkCreate(testUsers);
    await models.Worker.bulkCreate(testWorkers);
    await models.Client.bulkCreate(testClients);
    await models.CosmetologyService.bulkCreate(testCosmetologyServices);
    await models.HairdressingService.bulkCreate(testHairdressingServices);
    await models.CosmetologyReceipt.bulkCreate(testCosmetologyReceipts);
    await models.HairdressingReceipt.bulkCreate(testHairdressingReceipts);
    await models.Registr.bulkCreate(testRegistrs);
    await models.HairdressingReceipts_Registr.bulkCreate(testHairdressingReceipts_Registr);
    await models.CosmetologyReceipts_Registr.bulkCreate(testCosmetologyReceipts_Registr);
    console.log('Тестовые данные добавлены в таблицы!');
}
/*(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Создана база данных и таблицы!');
    
    // Добавление тестовых данных
    add_test()
    
  } catch (error) {
    console.error('Ошибка:', error);
  }
})();*/

const models={
    User,
    Worker,
    Client,
    CosmetologyService,
    HairdressingService,
    CosmetologyReceipt,
    HairdressingReceipt,
    Registr,
    HairdressingReceipts_Registr,
    CosmetologyReceipts_Registr
}

module.exports={sequelize,models}