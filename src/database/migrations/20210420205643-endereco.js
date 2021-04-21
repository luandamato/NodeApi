'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('enderecos', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id"},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      estado:{
        type: Sequelize.STRING,
        allowNull: false
      },
      cidade:{
        type: Sequelize.STRING,
        allownull: false
      }, 
      bairro:{
        type: Sequelize.STRING,
        allowNull: false
      },
      rua:{
        type: Sequelize.STRING,
        allownull: false
      }, 
      numero:{
        type: Sequelize.STRING,
        allowNull: false
      },
      complemento:{
        type: Sequelize.STRING,
        allownull: true
      },
      cep:{
        type: Sequelize.STRING,
        allowNull: false
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
   
    return queryInterface.dropTable('enderecos');
 }
};
