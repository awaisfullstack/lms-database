'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('submissions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      status: {
        type: Sequelize.ENUM('SUBMITTED', 'LATE', 'GRADED'),
        allowNull: false,
        defaultValue: 'SUBMITTED',
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 100,
        },
      },
      assignment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'assignments',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      student_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

    await queryInterface.addIndex('submissions', ['assignment_id'], {
      name: 'submissions_assignment_id_idx',
    });

    await queryInterface.addIndex('submissions', ['student_id'], {
      name: 'submissions_student_id_idx',
    });
    await queryInterface.addIndex(
      'submissions',
      ['assignment_id', 'student_id'],
      {
        unique: true,
        name: 'submissions_assignment_student_unique',
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('submissions');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_submissions_status";',
    );
  },
};
