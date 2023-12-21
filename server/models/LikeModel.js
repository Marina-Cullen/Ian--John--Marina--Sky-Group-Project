const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const Like = sequelize.define('Like', {
    like: DataTypes.INTEGER
}, 
{
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
});
module.exports = Like;