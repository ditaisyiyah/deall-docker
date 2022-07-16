const express = require('express')
const router = express.Router()

const Controller = require('../controllers/index')
const Middleware = require('../middlewares/index')

router.get('/', Controller.hello)

router.post('/users', Controller.register)
router.post('/auth/login', Controller.login)
router.post('/auth/refresh-token', Controller.refreshToken)

router.use(Middleware.authentication)

router.get('/users/profile', Controller.getMyProfile)

router.use(Middleware.adminAuthorization)

router.get('/users', Controller.getUsers)
router.get('/users/:userId', Controller.getUser)
router.put('/users/:userId', Controller.editUser)
router.delete('/users/:userId', Controller.deleteUser)


module.exports = router