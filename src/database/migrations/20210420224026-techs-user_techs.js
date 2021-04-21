'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('techs', {
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
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull: false
      }
    }),
    await queryInterface.createTable('user_techs', {
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
      techId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "techs", key: "id"},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
   
    await queryInterface.dropTable('user_techs');
    await queryInterface.dropTable('techs');
 }
};
