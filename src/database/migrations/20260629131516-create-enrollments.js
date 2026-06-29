'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('enrollments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'COMPLETED', 'DROPPED', 'SUSPENDED'),
        allowNull: false,
        defaultValue: 'ACTIVE',
      },
      course_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',
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

    await queryInterface.addIndex('enrollments', ['course_id'], {
      name: 'enrollments_course_id_idx',
    });

    await queryInterface.addIndex('enrollments', ['student_id'], {
      name: 'enrollments_student_id_idx',
    });
    await queryInterface.addIndex('enrollments', ['course_id', 'student_id'], {
      unique: true,
      name: 'enrollments_course_student_unique',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('enrollments');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_enrollments_status";',
    );
  },
};
