'use strict';

const { COURSES } = require('../seed-data/courses');
const { ASSIGNMENTS } = require('../seed-data/assignments');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('assignments', {
      id: Object.values(ASSIGNMENTS),
    });
    await queryInterface.bulkInsert('assignments', [
      {
        id: ASSIGNMENTS.nestjs_api,
        title: 'Build User CRUD API',
        description:
          'Create REST APIs for creating, updating, listing, and deleting users using NestJS and PostgreSQL.',
        due_date: '2026-07-10',
        total_marks: 10,
        course_id: COURSES.nestjs,
      },
      {
        id: ASSIGNMENTS.nestjs_auth,
        title: 'Implement JWT Authentication',
        description:
          'Implement login, registration, JWT access token, and refresh token functionality.',
        due_date: '2026-07-15',
        total_marks: 10,
        course_id: COURSES.nestjs,
      },
      {
        id: ASSIGNMENTS.react_todo,
        title: 'Build Todo Application',
        description:
          'Create a Todo application using React Hooks and local state management.',
        due_date: '2026-07-12',
        total_marks: 10,
        course_id: COURSES.react,
      },
      {
        id: ASSIGNMENTS.react_dashboard,
        title: 'Create Admin Dashboard',
        description:
          'Build a responsive admin dashboard using React and reusable components.',
        due_date: '2026-07-20',
        total_marks: 10,
        course_id: COURSES.react,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('assignments', {
      id: Object.values(ASSIGNMENTS),
    });
  },
};
