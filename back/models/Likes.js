const Sequelize = require('sequelize');
const db = require('../config/database');

const Likes = db.define('likes', {
    userId: {
        type: Sequelize.NUMBER
    },
    value: {
        type: Sequelize.NUMBER
    },
    articleId: {
        type: Sequelize.NUMBER
    }
});

module.exports = Likes;

// Sortir les likes a travers une table de liaison