'use strict';
const { USERS } = require('../seed-data/users');
const { ASSIGNMENTS } = require('../seed-data/assignments');

const SUBMISSIONS = {
  submission1: 'aaaa1111-1111-1111-1111-111111111111',
  submission2: 'bbbb2222-2222-2222-2222-222222222222',
  submission3: 'cccc3333-3333-3333-3333-333333333333',
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'submissions',
      [
        {
          id: SUBMISSIONS.submission1,
          status: 'GRADED',
          score: 8,
          assignment_id: ASSIGNMENTS.nestjs_api,
          student_id: USERS.student1,
        },
        {
          id: SUBMISSIONS.submission2,
          status: 'SUBMITTED',
          score: null,
          assignment_id: ASSIGNMENTS.nestjs_auth,
          student_id: USERS.student2,
        },
        {
          id: SUBMISSIONS.submission3,
          status: 'LATE',
          score: 7,
          assignment_id: ASSIGNMENTS.react_todo,
          student_id: USERS.student3,
        },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('submissions', {
      id: Object.values(SUBMISSIONS),
    });
  },
};
