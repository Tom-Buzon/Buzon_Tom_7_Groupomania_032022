const Sequelize = require('sequelize');
const db = require('../config/database');

const Comment = db.define('comment', {
    userId: {
        type: Sequelize.STRING
    },
    articleId: {
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

module.exports = Comment;