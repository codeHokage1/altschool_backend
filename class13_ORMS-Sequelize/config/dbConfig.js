const { Sequelize } = require("sequelize");
require("dotenv").config();

const config = require("./config")

const sequelize = new Sequelize(config.development);

module.exports = sequelize;
