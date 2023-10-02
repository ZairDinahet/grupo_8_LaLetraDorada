const fs = require('fs');
const path = require('path');

function cookieMiddleware(req, res, next) {
    next();

    if (req.cookies.userLogged != undefined) {
        let usersData = fs.readFileSync(path.join(__dirname, '../data/users.json'), {
            encoding: 'utf-8'
        });
        let users;

        if (usersData === "") {
            users = [];
        } else {
            users = JSON.parse(usersData);
        }

        let userToLogin;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == req.cookies.userLogged) {
                userToLogin = users[i];
                break;
            }
        }

        if (userToLogin) {
            req.session.userLogged = userToLogin.email;
        }
    }
}

module.exports = cookieMiddleware;