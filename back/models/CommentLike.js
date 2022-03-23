const Sequelize = require('sequelize');
const db = require('../config/database');

const CommentLike = db.define('commentLikes', {
    userId: {
        type: Sequelize.STRING
    },
    commentId: {
        type: Sequelize.STRING
    }
});

module.exports = CommentLike;