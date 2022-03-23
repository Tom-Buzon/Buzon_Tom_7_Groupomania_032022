const Sequelize = require('sequelize');
const db = require('../config/database');

const CommentDislike = db.define('commentDislikes', {
    userId: {
        type: Sequelize.STRING
    },
    commentId: {
        type: Sequelize.STRING
    }
});

module.exports = CommentDislike;