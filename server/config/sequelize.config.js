const { Sequelize } = require('sequelize');
//... schema nae ideas, your user, your password
const sequelize = new Sequelize('nameofschema', 'user', 'yourpassword', {
host: 'localhost',
dialect: 'mysql'
});

module.exports = sequelize;
