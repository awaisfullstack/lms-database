'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('courses', 'courses_created_by_fkey');
    await queryInterface.addConstraint('courses', {
      fields: ['created_by'],
      type: 'foreign key',
      name: 'courses_created_by_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('courses', 'courses_created_by_fkey');

    await queryInterface.addConstraint('courses', {
      fields: ['created_by'],
      type: 'foreign key',
      name: 'courses_created_by_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
};
