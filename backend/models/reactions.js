'use strict';
const {
  Model
} = require('sequelize');
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
    reactionID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reactions',
  });
  return Reactions;
};