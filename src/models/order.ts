const { DataTypes } = require("sequelize");

const sequelizeInstance = require("../utils/database");

const Order = sequelizeInstance.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Order;
