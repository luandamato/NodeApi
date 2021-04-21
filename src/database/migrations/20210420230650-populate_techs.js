'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('techs', [
      {nome: 'Python', createdAt: new Date(), updatedAt: new Date()}, 
      {nome: 'Java', createdAt: new Date(), updatedAt: new Date()}, 
      {nome: 'Swift', createdAt: new Date(), updatedAt: new Date()}
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
