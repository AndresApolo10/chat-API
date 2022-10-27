const router = require('express').Router()
const passport = require('passport')

const messageServices = require('./messages.services')
require('../middlewares/auth.middlewares')(passport)

// router.route('/:id/messages')
//     .post(passport.authenticate('jwt', {session: false}),
//           messageServices.createMessage)

module.exports = router