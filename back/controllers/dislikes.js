const Dislike = require('../models/Dislikes.js');
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



exports.dislike = (req, res, next) => {

    Dislike.findOne({
        where: {
            articleId: req.body.articleId,
            userId: req.body.userId
        }
    }).then((dislike) => {

        if (dislike) {
            dislike.destroy()
                .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        } else {

            dislike = new Dislike({
                articleId: req.body.articleId,
                userId: req.body.userId,
                value: "1"
            });

            dislike.save()
                .then(() => {
                    console.log('hello');
                    res.status(201).json({ message: 'Dislike enregistré !' });
                })
                .catch(error => {
                    console.log('wtf');
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


exports.getAllDislikes = (req, res, next) => {
    Dislike.findAll({
        where: {
            articleId: req.params.id
        }

    }).then(
        (Dislikes) => {
            res.status(200).json(Dislikes);

        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};