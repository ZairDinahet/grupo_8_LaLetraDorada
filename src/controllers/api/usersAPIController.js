const db = require('../../database/models');


const usersAPIController = {

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