const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const IdeaModel = sequelize.define('Idea', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
    ideas: {
    type: DataTypes.STRING(255),
    allowNull: false
},
image: {
    type: DataTypes.TEXT,
    allowNull: true
},
userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: 'users',
    key: 'id'
    }
}
}, {
sequelize,
modelName: 'Idea',
tableName: 'ideas',
timestamps: true
});

module.exports = IdeaModel;
