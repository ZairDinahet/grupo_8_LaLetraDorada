const db = require('../../database/models');


const usersAPIController = {
  
  list: async function(req,res){

   try{

     const users = await db.User.findAll({
      attributes: ['id', 'firstName','lastName', 'email']
     })
     const usersUpdate = users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      detail:  req.protocol + '://' + req.get('host') + req.url +'/' + user.id,
    }));

     return res.status(200).json({
      meta: {
        count: users.length,
        code:res.statusCode,
        url: req.protocol + '://' + req.get('host') + req.url,
      },
      data: usersUpdate,
     })

   }catch(error){
    return res.status(404).json({
      meta: {
        code:res.statusCode,
        message: error.message
      }
     })
    }
  },
  
  detail: async function(req, res){
    const { id } = req.params;

    try {
      const user = await db.User.findOne({
        where: {
          id
        },
        attributes: {
          exclude: ['password', 'category','idAddress']
        },
        include: [
          {
            model: db.Address,
            as: 'address',
          }
        ]
      });

      if(user){
        user.profileImg = req.protocol + '://' + req.get('host') + user.profileImg
        return res.status(200).json({
          meta: {
              status: res.statusCode,
              url: req.protocol + '://' + req.get('host') + req.url
          },
          data: user
      })
      }

      throw new Error('El usuario con el id ingresado no existe en la base de datos')

    } catch (error) {

      res.status(404).json({ 
        meta: {
          status: res.statusCode,
          url: req.protocol + '://' + req.get('host') + req.url
        },
        message: error.message 
      });

    }

  }

}


module.exports = usersAPIController