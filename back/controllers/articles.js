const Article = require('../models/Article.js');
const fs = require('fs');
/* const { rejects } = require('assert');
const { QueryTypes } = require('@sequelize/core');
const pg = require('postgres') */

/* const { Pool, Client } = require("pg");

const pool = new Pool({
    user: process.env.DbUser,
    host: "localhost",
    database: process.env.DbUser,
    password: process.env.DbPassword,
    port: "5432"
}); */



exports.createArticle = (req, res, next) => {
    //console.log(req.body.article)
    const articleObject = /* JSON.parse( */ req.body.article /* ) */ ;

    const article = new Article({
        ...articleObject,
        //      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    // console.log(article)
    article.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error, message: 'probleme enregistrement' }));
};

exports.getOneArticle = (req, res, next) => {
    Article.findOne({
        where: {
            id: req.params.id
        }
    }).then(
        (Article) => {
            res.status(200).json(Article);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );


};

exports.modifyArticle = (req, res, next) => {

    const articleObject = {...req.body }

    Article.findOne({
        where: {
            id: req.params.id
        }
    }).then(
        (Article) => {
            Article.update({
                ...articleObject
            }).then(
                () => {
                    res.status(201).json({
                        message: 'Article updated successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(520).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );

};

exports.deleteArticle = (req, res, next) => {
    Article.findOne({
        where: {
            id: req.params.id
        }

    }).then(Article => {
        Article.destroy()
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            .catch(error => res.status(400).json({ error }));
    })

    .catch(error => res.status(500).json({ error }));
};


exports.getAllArticles = (req, res, next) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(
        (Articles) => {
            res.status(200).json(Articles);

        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};