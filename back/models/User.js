const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    }
})

module.exports = User;