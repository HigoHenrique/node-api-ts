'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('book_category', { 
      book_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'book',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE',
        primaryKey: true
      },
      category_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'category',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE',
        primaryKey: true
      }

    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('book_category');
  }
};
