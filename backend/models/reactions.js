'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Reactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reactions.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    reactionID: DataTypes.INTEGER,
    userID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Reactions',
  });
  return Reactions;
};