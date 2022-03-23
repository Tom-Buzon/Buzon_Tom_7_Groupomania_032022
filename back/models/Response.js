const Sequelize = require('sequelize');
const db = require('../config/database');

const Response = db.define('response', {
    userId: {
        type: Sequelize.NUMBER
    },
    commentId: {
        type: Sequelize.NUMBER
    },
    content: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = Response;