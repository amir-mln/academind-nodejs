const { DataTypes } = require("sequelize");

const sequelizeInstance = require("../utils/database");

const Cart = sequelizeInstance.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
