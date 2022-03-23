const Like = require('../models/Likes.js');
const fs = require('fs');
/* const { rejects } = require('assert');
const { QueryTypes } = require('@sequelize/core');*/
const pg = require('postgres');

const { Pool, Client } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "OPCL-P7",
    password: "root",
    port: "5432"
});


exports.like = (req, res, next) => {

    Like.findOne({
        where: {
            articleId: req.body.articleId,
            userId: req.body.userId
        }
    }).then((like) => {

        if (like) {
            like.destroy()
                .then(() => res.status(202).json({ message: 'Objet supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        } else {

            like = new Like({
                articleId: req.body.articleId,
                userId: req.body.userId,
                value: "1"
            });

            like.save()
                .then(() => {

                    res.status(201).json({ message: 'Like enregistré !' });
                })
                .catch(error => {

                    res.status(400).json({ error, message: 'probleme enregistrement' })
                });
        }
    }).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.getAllLikes = (req, res, next) => {
    Like.findAll({
        where: {
            articleId: req.params.id
        }

    }).then(
        (Likes) => {
            res.status(200).json(Likes);

        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};