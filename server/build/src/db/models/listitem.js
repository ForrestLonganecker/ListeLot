'use strict';
module.exports = function (sequelize, DataTypes) {
    var ListItem = sequelize.define('ListItem', {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isComplete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        listId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});
    ListItem.associate = function (models) {
        // associations can be defined here
        ListItem.belongsTo(models.List, {
            foreignKey: 'listId',
            onDelete: 'CASCADE'
        });
    };
    return ListItem;
};
