const Sequelize = require('sequelize');
const db = require('../config/database');

const Article = db.define('article', {
    userId: {
        type: Sequelize.NUMBER
    },
    title: {
        type: Sequelize.STRING
    },
    author: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    comments: {
        type: Sequelize.STRING
    },
    idComments: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = Article;

// Sortir les likes a travers une table de liaison