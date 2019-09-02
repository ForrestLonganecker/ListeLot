'use strict';

import { QueryInterface } from "sequelize/types";

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {msg: 'must be valid email'}
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.dropTable('Users');
  }
};