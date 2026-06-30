'use strict';

const { USERS } = require('../seed-data/users');
const { COURSES } = require('../seed-data/courses');
const { ENROLLMENTS } = require('../seed-data/enrollments');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'enrollments',
      [
        {
          id: ENROLLMENTS.nestjs_student1,
          course_id: COURSES.nestjs,
          student_id: USERS.student1,
          status: 'COMPLETED',
        },
        {
          id: ENROLLMENTS.nestjs_student2,
          course_id: COURSES.nestjs,
          student_id: USERS.student2,
          status: 'ACTIVE',
        },
        {
          id: ENROLLMENTS.react_student1,
          course_id: COURSES.react,
          student_id: USERS.student1,
          status: 'DROPPED',
        },
        {
          id: ENROLLMENTS.react_student3,
          course_id: COURSES.react,
          student_id: USERS.student3,
          status: 'COMPLETED',
        },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('enrollments', {
      id: Object.values(ENROLLMENTS),
    });
  },
};
