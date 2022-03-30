const { DataTypes } = require("sequelize");

const sequelizeInstance = require("../utils/database");

const CartItem = sequelizeInstance.define("cartItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: DataTypes.INTEGER,
});

module.exports = CartItem;
