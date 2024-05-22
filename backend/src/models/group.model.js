module.exports = function (sequelize, Sequelize) {
  var Group = sequelize.define("groups", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    desc: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  });
  Group.seq = sequelize;
  return Group;
};
