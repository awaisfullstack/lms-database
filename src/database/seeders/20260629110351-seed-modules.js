'use strict';

const { COURSES } = require('../seed-data/courses');

const MODULES = {
  nestjs_intro: '11111111-1111-1111-1111-111111111111',
  nestjs_dependency_injection: '22222222-2222-2222-2222-222222222222',
  nestjs_modules: '33333333-3333-3333-3333-333333333333',
  react_intro: '44444444-4444-4444-4444-444444444444',
  react_components: '55555555-5555-5555-5555-555555555555',
  react_hooks: '66666666-6666-6666-6666-666666666666',
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courses', {
      id: Object.values(MODULES),
    });
    await queryInterface.bulkInsert('modules', [
      {
        id: MODULES.nestjs_intro,
        title: 'Introduction to NestJS',
        description:
          'Learn what NestJS is and why it is popular for enterprise backend development.',
        position: 1,
        course_id: COURSES.nestjs,
      },
      {
        id: MODULES.nestjs_dependency_injection,
        title: 'Dependency Injection',
        description:
          'Understand providers, services, and dependency injection in NestJS.',
        position: 2,
        course_id: COURSES.nestjs,
      },
      {
        id: MODULES.nestjs_modules,
        title: 'NestJS Modules',
        description:
          'Learn how feature modules help organize large applications.',
        position: 3,
        course_id: COURSES.nestjs,
      },
      {
        id: MODULES.react_intro,
        title: 'Introduction to React',
        description:
          'Learn the basics of React and component-driven development.',
        position: 1,
        course_id: COURSES.react,
      },
      {
        id: MODULES.react_components,
        title: 'React Components',
        description:
          'Understand functional components, props, and composition.',
        position: 2,
        course_id: COURSES.react,
      },
      {
        id: MODULES.react_hooks,
        title: 'React Hooks',
        description: 'Learn useState, useEffect, and custom hooks.',
        position: 3,
        course_id: COURSES.react,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courses', {
      id: Object.values(MODULES),
    });
  },
};
