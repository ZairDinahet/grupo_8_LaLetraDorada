const db = require('../database/models')
const user = {
    auth : (req,res,next) => {
        if(req.session.userLogged){ 
         return res.redirect("/products")
        }else{
         next()
        }
    },
    logged: (req, res, next) => {
        res.locals.isLogged = false;
        res.locals.permiss = false;
    
        if (req.session.userLogged) {
            db.User.findOne({
                where: {
                    email: req.session.userLogged
                }
            })
            .then(user => {            
                if (user && user.category) {        
                    if (user.category.toLowerCase() === "administrator") {
                        res.locals.isLogged = true;
                        res.locals.permiss = true;
                    } else {
                        res.locals.isLogged = true;
                        res.locals.permiss = false;
                    }
                } else {
                    console.log("User or category not found");
                }
            
                next();
            })
            
            .catch(error => {
                console.log(error);
                next(error);
            });
        } else {
            next();
        }
    },
}

module.exports = user;