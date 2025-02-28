'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static async getAllUsers() {
      return await User.findAll();
    }

    static async createUser(userData) {
      return await User.create({
        username: userData.username,
        password: userData.password,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        address: userData.address
      });
    }

    static async deleteUser(id) {
      return await User.destroy({
        where: { id }
      });
    }

    static async updateUser(userData) {
      const user = await User.findByPk(userData.id);
      if (user) {
        return await user.update ({
          username: userData.username,
          password: userData.password
        });
      }
      return null;
    }

    static async registerUser(userData) {
      const user = await User.create({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password
      });
      return user;
  }

  static async loginUser(email) {
    return await User.findOne({ where: { email } });
}

      static async setResetToken(email, token, expiry) {
        return await User.update(
          { resetToken: token, resetTokenExpiry: expiry },
          { where: { email } }
        );
      }

      static async updatePassword(userId, newPassword) {
        return await User.update(
          { password: newPassword },
          { where: { id: userId } }
        );
      }

      static async editProfile(userId, profileData) {
        return await User.update(
            { profile: profileData },
            { where: { id: userId } }
        );
    }

    static async findByResetToken(token) { // esta funcion es para buscar un usuario por el token de reseteo de contraseña
      return await User.findOne({
          where: {
              resetToken: token,
              resetTokenExpiry: { [Op.gt]: new Date() }
          }
      });
    }
  }
  
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    resetToken: DataTypes.STRING,
    resetTokenExpiry: DataTypes.DATE,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
    bio: DataTypes.TEXT,
    location: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    artStyle: DataTypes.STRING,
    avatar: DataTypes.STRING

}, {
  sequelize,
  modelName: 'User'
});
  return User;
};