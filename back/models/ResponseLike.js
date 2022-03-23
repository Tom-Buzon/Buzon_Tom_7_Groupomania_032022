const Sequelize = require('sequelize');
const db = require('../config/database');

const ResponseLike = db.define('responseLikes', {
    userId: {
        type: Sequelize.STRING
    },
    responseId: {
        type: Sequelize.STRING
    }
});

module.exports = ResponseLike;