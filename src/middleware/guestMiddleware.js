const guest = {
  auth: (req,res,next) => {
    if(!req.session.userLogged){ 
     return res.redirect("/user/login")
    }else{
     next()
    }
  },
  authAdmin: (req,res,next) => {
    if (!res.locals.permiss) {
      return res.redirect('/products');
  }else{
    next()
   }
  }
}

module.exports= guest;