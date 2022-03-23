const { Sequelize } = require('sequelize');
require('dotenv').config();



module.exports = new Sequelize(process.env.DbName, process.env.DbUser, process.env.DbPassword, {
    host: 'localhost',
    dialect: 'postgres',
});