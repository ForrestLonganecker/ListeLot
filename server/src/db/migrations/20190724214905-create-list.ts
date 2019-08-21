'use strict';

import { QueryInterface } from "sequelize/types";
import { Sequelize } from "../models";

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return queryInterface.createTable('Lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: <any>{
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        referneces: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        } 
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
  down: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return queryInterface.dropTable('Lists');
  }
};