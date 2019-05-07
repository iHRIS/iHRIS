'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING,
        primaryKey: false,
        allowNull: false
      },
      nationality: {
        type: Sequelize.STRING,
        primaryKey: false,
        allowNull: false
      },
      otherNames: {
        type: Sequelize.STRING,
        primaryKey: false,
        allowNull: true
      },
      residence: {
        type: Sequelize.STRING,
        primaryKey: false,
        allowNull: false
      },
      surname: {
        type: Sequelize.STRING,
        primaryKey: false,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        primaryKey: false,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATEONLY,
        primaryKey: false,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
