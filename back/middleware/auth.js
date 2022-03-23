const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log("requetteToken ==== " + req.headers.authorization)
        let tokenString = req.headers.authorization.split(',')[1]
        let idString = req.headers.authorization.split(',')[0]
        let isAmdinString = req.headers.authorization.split(',')[2]
        const token = tokenString;
        const idRequete = idString;
        const isAdminRequete = isAmdinString;
        /* console.log("token ===========", token)
        console.log("idRequete ===========", idRequete)
        console.log("isAdminRequete ===========", isAmdinString) */
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECERT')
            /* console.log("decodedToken ===========", decodedToken) */
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        /*  console.log("userId ===========", userId)
         console.log("isAdmin ===========", isAdmin.toString()) */

        if (userId !== idRequete || isAdminRequete != isAdmin.toString()) {
            console.log('impossible route')
            throw 'User Id non valable';

        } else {

            req.auth = { userId };
            console.log("req.auth ===========", req.auth)

            if (req.body.userId && req.body.userId !== userId) {
                console.log("req.body.userId ===========", req.body.userId)

                throw 'User Id non valable';
            } else {
                console.log('auth validée')

                next();
            }
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requete non authentifié' });
    }
};