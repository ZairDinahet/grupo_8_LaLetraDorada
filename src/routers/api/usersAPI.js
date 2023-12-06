const { Router } = require('express');
const usersAPIController = require('../../controllers/api/usersAPIController')


const router = Router();


router.get('/api/users', usersAPIController.list)
router.get('/api/users/:id', usersAPIController.detail)


module.exports = router;