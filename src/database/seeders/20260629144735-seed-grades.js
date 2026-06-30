'use strict';

const { ENROLLMENTS } = require('../seed-data/enrollments');
const GRADES = {
  enrollment1: '11111111-aaaa-1111-aaaa-111111111111',
  enrollment2: '22222222-aaaa-2222-aaaa-222222222222',
  enrollment3: '33333333-aaaa-3333-aaaa-333333333333',
  enrollment4: '44444444-aaaa-4444-aaaa-444444444444',
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'grades',
      [
        {
          id: GRADES.enrollment1,
          total_marks: 100,
          obtained_marks: 92,
          status: 'PASSED',
          letter_grade: 'A',
          enrollment_id: ENROLLMENTS.nestjs_student1,
        },
        {
          id: GRADES.enrollment2,
          total_marks: 100,
          obtained_marks: 78,
          status: 'PASSED',
          letter_grade: 'B',
          enrollment_id: ENROLLMENTS.nestjs_student2,
        },
        {
          id: GRADES.enrollment3,
          total_marks: 100,
          obtained_marks: 58,
          status: 'PASSED',
          letter_grade: 'C',
          enrollment_id: ENROLLMENTS.react_student1,
        },
        {
          id: GRADES.enrollment4,
          total_marks: 100,
          obtained_marks: null,
          status: 'INCOMPLETE',
          letter_grade: null,
          enrollment_id: ENROLLMENTS.react_student3,
        },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('grades', { id: Object.values(GRADES) });
  },
};
