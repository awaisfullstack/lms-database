'use strict';
const { USERS } = require('../seed-data/users');
const { COURSES } = require('../seed-data/courses');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'courses',
      [
        {
          id: COURSES.nestjs,
          title: 'NestJS Masterclass',
          description: 'Complete NestJS course.',
          created_by: USERS.instructor1,
        },
        {
          id: COURSES.react,
          title: 'React Fundamentals',
          description: 'Learn React from scratch.',
          created_by: USERS.instructor2,
        },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courses', {
      id: [COURSES.nestjs, COURSES.react],
    });
  },
};
