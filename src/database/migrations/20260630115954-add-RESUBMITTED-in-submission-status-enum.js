'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `ALTER TYPE "enum_submissions_status"
       ADD VALUE IF NOT EXISTS 'RESUBMITTED';
      `,
    );
  },

  async down(queryInterface, Sequelize) {},
};
