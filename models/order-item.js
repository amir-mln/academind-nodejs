const { DataTypes } = require("sequelize");

const sequelizeInstance = require("../utils/database");

const OrderItem = sequelizeInstance.define("orderItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: DataTypes.INTEGER,
});

module.exports = OrderItem;
