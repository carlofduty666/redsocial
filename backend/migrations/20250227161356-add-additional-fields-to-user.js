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
    await queryInterface.addColumn('Users', 'bio', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'location', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'age', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'gender', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'birthdate', {
      type: Sequelize.DATE,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'artStyle', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'bio');
    await queryInterface.removeColumn('Users', 'location');
    await queryInterface.removeColumn('Users', 'age');
    await queryInterface.removeColumn('Users', 'gender');
    await queryInterface.removeColumn('Users', 'birthdate');
    await queryInterface.removeColumn('Users', 'artStyle');

  }
};
