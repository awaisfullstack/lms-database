'use strict';
const { USERS } = require('../seed-data/users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = 'Password@123';
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: USERS.student1,
          name: 'Muhammad Awais',
          email: 'awais.student@example.com',
          password,
          role: 'STUDENT',
        },
        {
          id: USERS.student2,
          name: 'Ali Hassan',
          email: 'ali.student@example.com',
          password,
          role: 'STUDENT',
        },
        {
          id: USERS.student3,
          name: 'Sarah Khan',
          email: 'sarah.student@example.com',
          password,
          role: 'STUDENT',
        },
        {
          id: USERS.instructor1,
          name: 'Ahmed Raza',
          email: 'ahmed.instructor@example.com',
          password,
          role: 'INSTRUCTOR',
        },
        {
          id: USERS.instructor2,
          name: 'Fatima Noor',
          email: 'fatima.instructor@example.com',
          password,
          role: 'INSTRUCTOR',
        },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: [
        'awais.student@example.com',
        'ali.student@example.com',
        'sarah.student@example.com',
        'ahmed.instructor@example.com',
        'fatima.instructor@example.com',
      ],
    });
  },
};
