'use strict';

import { QueryInterface } from "sequelize/types";

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.createTable('ListItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isComplete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      listId:  {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: <any> {
          model: 'Lists',
          key: 'id',
          as: 'listId'
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
  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.dropTable('ListItems');
  }
};