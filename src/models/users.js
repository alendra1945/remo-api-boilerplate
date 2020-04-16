'use strict'
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    roleId: DataTypes.INTEGER,
    username: {
      type: DataTypes.STRING,
      validate: {
        isValidUsername: (value) => {
          if (!(/^[a-z0-9]{6,}/.test(value))) {
            throw new Error('Username only contain lowercase letters or numbers only and minimal six character')
          }
        },
        isUnique: async (value) => {
          const user = await users.findOne({ username: value })
          if (user) {
            throw new Error('Username already in use')
          }
        }
      }
    },
    password: DataTypes.STRING,
    status: DataTypes.TINYINT,
    isDelete: DataTypes.TINYINT
  }, {})
  users.associate = function (models) {
    users.belongsTo(models.userRoles, { foreignKey: 'roleId', targetKey: 'id' })
    users.hasOne(models.userProfiles, { foreignKey: 'userId' })
  }
  return users
}
