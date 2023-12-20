const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const UserModel = sequelize.define('User', {
name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    notEmpty: {
        msg: 'Please enter your name'
    },
    }
},
alias: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    notEmpty: {
        msg: 'Please enter an alias'
    },
    }
},
email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
    isEmail: {
        msg: 'Must be a valid email address'
    },
    notEmpty: {
        msg: 'Email cannot be empty'
    },
    }
},
password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    notEmpty: {
        msg: 'Password cannot be empty'
    },
    len: {
        args: [8, 42],
        msg: 'Password should be between 8 and 42 characters'
    },
    }
}
}, {
sequelize,
modelName: 'User',
tableName: 'users',
timestamps: true,
createdAt: 'created_at',
updatedAt: 'updated_at',
});

module.exports = UserModel;
