const { Sequelize } = require('sequelize');
//... schema nae ideas, your user, your password
const sequelize = new Sequelize('ideas', 'root', 'rootroot', {
host: 'localhost',
dialect: 'mysql'
});

module.exports = sequelize;
