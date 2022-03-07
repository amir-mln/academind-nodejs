const { Sequelize } = require("sequelize");

const sequelizeInstance = new Sequelize("academind-nodejs", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelizeInstance;
