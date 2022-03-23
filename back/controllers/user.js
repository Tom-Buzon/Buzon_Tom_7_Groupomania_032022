const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    User.findOne({ where: { name: req.body.name } })
        .then(user => {
            //console.log(user)
            if (user === null) {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const user = new User({
                            name: req.body.name,
                            password: hash,
                            isAdmin: false
                        })
                        user.save()
                            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    })
                    .catch(error => res.status(500).json({ error: error }));
            } else {
                res.status(401).json({ error: "utilisateur déjà existant" });
            }

        })
};


exports.login = (req, res, next) => {
    const user = User.findOne({ where: { name: req.body.name } })
        .then(user => {
            if (user === null) {
                res.status(401).json({ error: "utilisateur non trouvé" });
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(401).json({ error: "Mot de passe incorrecte" });
                    }

                    console.log(user)
                    res.status(200).json({

                        userId: user.id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign({
                                userId: user.id,
                                isAdmin: user.isAdmin
                            },
                            'RANDOM_TOKEN_SECERT', { expiresIn: '24h' }
                        )
                    })
                })
        })

    .catch(error => res.status(500).json({ error }))

};

exports.getOne = (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(
        (user) => {
            res.status(200).json(user);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};
exports.deleteUser = (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(
        (user) => {
            user.destroy()
                .then(() => res.status(200).json({ message: 'User supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};