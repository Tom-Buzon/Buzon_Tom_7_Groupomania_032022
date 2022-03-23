const Sequelize = require('sequelize');
const db = require('../config/database');

const ResponseDislike = db.define('responseDislikes', {
    userId: {
        type: Sequelize.STRING
    },
    responseId: {
        type: Sequelize.STRING
    }
});

module.exports = ResponseDislike;