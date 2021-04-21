'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.createTable('users', {
       id:{
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
       },
       nome:{
         type: Sequelize.STRING,
         allowNull: false
       },
       email:{
         type: Sequelize.STRING,
         allownull: false
       }, 
       createdAt:{
         type: Sequelize.DATE,
         allowNull: false
       },
       updatedAt:{
         type: Sequelize.DATE,
         allowNull: false
       }
     })
  },

  down: async (queryInterface, Sequelize) => {
    
     return queryInterface.dropTable('users');
  }
};
