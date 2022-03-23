const Sequelize = require('sequelize');
const db = require('../config/database');

const Dislike = db.define('dislike', {
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

module.exports = Dislike;

// Sortir les dislike a travers une table de liaison