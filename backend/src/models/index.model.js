var dbConfig = require("../configs/db.config");
var Sequelize = require("sequelize");
var sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
    logging: false,
  }
);
var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.groups = require("./group.model")(sequelize, Sequelize);
module.exports = db;