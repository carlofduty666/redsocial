'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE' // Si se elimina un usuario, se eliminan todos sus perfiles
      });
    }
  }

  Profile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: DataTypes.STRING,
    bio: DataTypes.TEXT,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });

  return Profile;
}