const ResponseLike = require('../models/ResponseLike.js');
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

    console.log(req.body)
    ResponseLike.findOne({
        where: {
            responseId: req.body.responseId,
            userId: req.body.userId
        }
    }).then((responseLike) => {

        if (responseLike) {
            responseLike.destroy()
                .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        } else {

            responseLike = new ResponseLike({
                responseId: req.body.responseId,
                userId: req.body.userId
            });

            responseLike.save()
                .then(() => {
                    console.log('hello');
                    res.status(201).json({ message: 'ResponseLikes enregistré !' });
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
    ResponseLike.findAll({
        where: {
            responseId: req.params.id
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