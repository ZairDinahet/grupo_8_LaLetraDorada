const fs = require('fs');
const path = require('path');
const db = require('../database/models');

function cookieMiddleware(req, res, next) {
    next();

    if (req.cookies.userLogged != undefined) {
        db.User.findOne({
            where: {
                email: req.cookies.userLogged
            }
        })
        .then(user => {
            if(user) {
                req.session.userLogged = user.email;
            }
        })
        .catch(error => console.log(error))
    }
}

module.exports = cookieMiddleware;