// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define("Student", {
  // Define your model attributes
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Student;
