const router = require('express').Router()
const passport = require('passport')
const { getMessagesByConversation, getMessageById, deleteMessage } = require('../messages/messages.services')
const { createMessage } = require('../messages/messages.services')

const conversationServices = require('./conversations.services')
require('../middlewares/auth.middlewares')(passport)

router.route('/')
    .get(passport.authenticate('jwt', {session: false}),
         conversationServices.getAllConversations)
    .post(passport.authenticate('jwt', {session: false}),
          conversationServices.createConversation)

router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}),
        conversationServices.getConversationById)
    .patch(passport.authenticate('jwt', {session: false}),
        conversationServices.patchConversation)
    .delete(passport.authenticate('jwt', {session: false}),
        conversationServices.deleteConversation)

router.route('/:id/messages')
    .post(passport.authenticate('jwt', {session: false}),
            createMessage)
    .get(passport.authenticate('jwt', {session: false}),
            getMessagesByConversation)

router.route('/:id/messages/:id')
    .get(passport.authenticate('jwt', {session: false}),
            getMessageById)
    .delete(passport.authenticate('jwt', {session: false}),
            deleteMessage)

module.exports = router