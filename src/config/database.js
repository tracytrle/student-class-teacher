// config/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mywebapp", "root", "letruongyamato", {
  host: "localhost",
  dialect: "mysql", // Choose the dialect you need: 'mysql', 'sqlite', 'postgres', 'mssql'
});

module.exports = sequelize;
