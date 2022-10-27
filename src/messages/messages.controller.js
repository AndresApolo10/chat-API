const Messages = require('../models/messages.models')
const uuid = require('uuid')
const Users = require('../models/users.models')
const Conversations = require('../models/conversations.models')

const createMessage = async (data) => {
    const response = await Messages.create({
        id: uuid.v4(),
        message: data.message,
        userId: data.userId,
        conversationId: data.conversationId
    })
    return response
}

const getMessagesByConversation = async (conversationId) => {
    const data = await Messages.findAll({
        where: {
            conversationId
        },
        attributes: ['id', 'message'],
        include: [
            {
                model: Conversations,
                attributes: { 
                    exclude: ['userId', 'createdAt', 'updatedAt' ]
                },
                include: [
                    {
                        model: Users,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt' ] 
                        }
                    }
                ]
            }
        ]
    })
    return data
}

const getMessageById = async(id) => {
    const data = await Messages.findOne({
        where: {
            id
        },
        attributes: ['id', 'message'],
        include: [
            {
                model: Conversations,
                attributes: { 
                    exclude: ['userId', 'createdAt', 'updatedAt' ]
                },
                include: [
                    {
                        model: Users,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt' ] 
                        }
                    }
                ]
            }
        ]
    })
    return data
}

const deleteMessage = async (id) => {
    const data = await Messages.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    createMessage,
    getMessagesByConversation,
    getMessageById,
    deleteMessage
}