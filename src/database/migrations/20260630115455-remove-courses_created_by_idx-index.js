'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeIndex('courses', 'courses_created_by_idx');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addIndex('courses', ['created_by'], {
      name: 'courses_created_by_idx',
    });
  },
};
