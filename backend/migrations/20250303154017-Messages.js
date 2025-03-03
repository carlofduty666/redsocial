'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Reactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      sender_id: {
        type: Sequelize.BIGINT,
        foreignKey: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'SET NULL', // when user is deleted, set the foreign key to null
      },
      receiver_id: {
        type: Sequelize.BIGINT,
        foreignKey: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'SET NULL', // when user is deleted, set the foreign key to null
      },
      content: {
        type: Sequelize.TEXT 
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
