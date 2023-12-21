const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const UserModel = sequelize.define('User', {
first_name: {
    type: DataTypes.STRING(55),
    allowNull: true,
},
last_name: {
    type: DataTypes.STRING(55),
    allowNull: true,
},
alias: {
    type: DataTypes.STRING(45),
    allowNull: false,
},
email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
},
password: {
    type: DataTypes.STRING(255),
    allowNull: false,
},
}, {
sequelize,
modelName: 'User',
tableName: 'users',
timestamps: true,
createdAt: 'created_at',
updatedAt: 'updated_at',
});

module.exports = UserModel;
