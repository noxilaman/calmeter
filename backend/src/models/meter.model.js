
module.exports = function (sequelize, Sequelize) {
  var Group = require("./group.model")(sequelize, Sequelize);
  var User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    group_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  });
  User.belongsTo(Group, { foreignKey: "group_id" });
  User.seq = sequelize;
  return User;
};
