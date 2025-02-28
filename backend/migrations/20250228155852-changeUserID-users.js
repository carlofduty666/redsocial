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
    // await queryInterface.addColumn('Posts', 'userID', {
    //   type: Sequelize.INTEGER,
    //   alooNull: true,
    //   references: {
    //     model: 'User',
    //     key: 'id'
    //   },
    //   onDelete: 'SET NULL',
    // })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Posts', 'userID');
    
  }
};
