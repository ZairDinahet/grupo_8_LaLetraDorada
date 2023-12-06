const { Router } = require('express');
const usersAPIController = require('../../controllers/api/usersAPIController')


const router = Router();



router.get('/:id', usersAPIController.detail)


module.exports = router;