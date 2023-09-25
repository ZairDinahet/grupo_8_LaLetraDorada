const user = {
    auth : (req,res,next) => {
        if(req.session.userLogged){ 
         return res.redirect("/products")
        }else{
         next()
        }
    },
    logged : (req,res,next) => {
        res.locals.isLogged = false;
        if(req.session.userLogged){
            res.locals.isLogged = true;
        }
        next()
    }    
}

module.exports = user;