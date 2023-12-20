const { Sequelize } = require('sequelize');
//... schema nae ideas, your user, your password
const sequelize = new Sequelize('ideas', 'root', 'Codewiser2543', {
host: 'localhost',
dialect: 'mysql'
});

module.exports = sequelize;
