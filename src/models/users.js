'use strict'
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    roleId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.TINYINT,
    isDelete: DataTypes.TINYINT
  }, {})
  users.associate = function (models) {
    users.belongsTo(models.userRoles, { foreignKey: 'roleId', targetKey: 'id' })
  }
  return users
};
