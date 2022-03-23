const Comment = require('../models/Comment.js');
const fs = require('fs');
/* const { rejects } = require('assert');
const { QueryTypes } = require('@sequelize/core');
const pg = require('postgres') */

const { Pool, Client } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "OPCL-P7",
    password: "root",
    port: "5432"
});



exports.createComment = (req, res, next) => {
    console.log(req.body.comment)
    const tttt = req.body.comment

    const comment = new Comment({
        ...tttt
    });
    console.log(comment)
    comment.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error, message: 'probleme enregistrement' }));
};

exports.getOneComment = (req, res, next) => {
    Comment.findOne({
        where: {
            id: req.params.id
        }
    }).then(
        (Comment) => {
            res.status(200).json(Comment);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );


};

exports.modifyComment = (req, res, next) => {

    const commentObject = {...req.body }

    Comment.findOne({
        where: {
            id: req.params.id
        }
    }).then(
        (Comment) => {
            Comment.update({
                ...commentObject
            }).then(
                () => {
                    res.status(201).json({
                        message: 'Comment updated successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
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

exports.deleteComment = (req, res, next) => {
    Comment.findOne({
        where: {
            id: req.params.id
        }

    }).then(Comment => {
        Comment.destroy()
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            .catch(error => res.status(400).json({ error }));
    })

    .catch(error => res.status(500).json({ error }));
};


exports.getAllComments = (req, res, next) => {

    Comment.findAll({
        where: {
            articleId: req.params.id
        }
    }).then(
        (comments) => {
            res.status(200).json(comments);

        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};