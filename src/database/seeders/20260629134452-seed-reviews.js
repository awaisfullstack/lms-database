'use strict';

const { USERS } = require('../seed-data/users');
const { COURSES } = require('../seed-data/courses');
const REVIEWS = {
  review1: '11111111-aaaa-1111-aaaa-111111111111',
  review2: '22222222-aaaa-2222-aaaa-222222222222',
  review3: '33333333-aaaa-3333-aaaa-333333333333',
  review4: '44444444-aaaa-4444-aaaa-444444444444',
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviews', { id: Object.values(REVIEWS) });

    await queryInterface.bulkInsert('reviews', [
      {
        id: REVIEWS.review1,
        course_id: COURSES.nestjs,
        student_id: USERS.student1,
        rating: 5,
        comment:
          'Excellent course with practical examples and real-world projects.',
      },
      {
        id: REVIEWS.review2,
        course_id: COURSES.nestjs,
        student_id: USERS.student2,
        rating: 4,
        comment: 'Very good content. I would like to see more advanced topics.',
      },
      {
        id: REVIEWS.review3,
        course_id: COURSES.react,
        student_id: USERS.student1,
        rating: 5,
        comment:
          'One of the best React courses I have taken. Highly recommended.',
      },
      {
        id: REVIEWS.review4,
        course_id: COURSES.react,
        student_id: USERS.student3,
        rating: 4,
        comment: 'Great explanations and easy to follow for beginners.',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviews', { id: Object.values(REVIEWS) });
  },
};
