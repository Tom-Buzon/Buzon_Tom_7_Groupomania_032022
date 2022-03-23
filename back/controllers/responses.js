const Response = require('../models/Response.js');
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



exports.createResponse = (req, res, next) => {
    console.log(req.body.response)
    const responseObject = /* JSON.parse( */ req.body.response /* ) */ ;

    const response = new Response({
        ...responseObject,
        //      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    console.log(response)
    response.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error, message: 'probleme enregistrement' }));
};

exports.getOneResponse = (req, res, next) => {
    Response.findOne({
        where: {
            id: req.params.id
        }
    }).then(
        (Response) => {
            res.status(200).json(Response);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyResponse = (req, res, next) => {

    const responseObject = {...req.body }

    Response.findOne({
        where: {
            id: req.params.id
        }
    }).then(
        (Response) => {
            Response.update({
                ...responseObject
            }).then(
                () => {
                    res.status(201).json({
                        message: 'Response updated successfully!'
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

exports.deleteResponse = (req, res, next) => {
    Response.findOne({
        where: {
            id: req.params.id
        }

    }).then(Response => {
        Response.destroy()
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            .catch(error => res.status(400).json({ error }));
    })

    .catch(error => res.status(500).json({ error }));
};


exports.getAllResponses = (req, res, next) => {
    Response.findAll({
        where: {
            commentId: req.params.id
        }
    }).then(
        (Responses) => {
            res.status(200).json(Responses);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};