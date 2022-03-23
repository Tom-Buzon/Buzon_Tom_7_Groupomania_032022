const CommentDislike = require('../models/CommentDislike.js');
const fs = require('fs');
/* const { rejects } = require('assert');
const { QueryTypes } = require('@sequelize/core');*/
const pg = require("postgres");

const { Pool, Client } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "OPCL-P7",
    password: "root",
    port: "5432"
});

exports.like = (req, res, next) => {
    CommentDislike.findOne({
        where: {
            commentId: req.body.commentId,
            userId: req.body.userId
        }
    }).then((commentLike) => {

        if (commentLike) {
            commentLike.destroy()
                .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        } else {

            commentLike = new CommentDislike({
                commentId: req.body.commentId,
                userId: req.body.userId
            });

            console.log(0);

            commentLike.save()
                .then(() => {
                    console.log('hello');
                    res.status(201).json({ message: 'CommentLikes enregistré !' });
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


exports.getAllLikes = (req, res, next) => {
    CommentDislike.findAll({
        where: {
            commentId: req.params.id
        }

    }).then(
        (likes) => {
            res.status(200).json(likes);

        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};