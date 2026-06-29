'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('grades', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      total_marks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      obtained_marks: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('PASSED', 'FAILED', 'INCOMPLETE'),
        allowNull: false,
        defaultValue: 'INCOMPLETE',
      },
      letter_grade: {
        type: Sequelize.ENUM('A', 'B', 'C', 'D', 'F'),
        allowNull: true,
      },
      enrollment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'enrollments',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('grades', ['enrollment_id'], {
      unique: true,
      name: 'grades_enrollment_id_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('grades');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_grades_status";',
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_grades_letter_grade";',
    );
  },
};
