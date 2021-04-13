'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('superheroes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nickname: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      realName: {
        field: 'real_name',
        allowNull: false,
        type: Sequelize.STRING,
      },
      originDescription: {
        field: 'origin_description',
        type: Sequelize.TEXT,
      },
      catchPhrase: {
        field: 'catch_phrase',
        type: Sequelize.STRING,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('superheroes');
  },
};
