const Conversations = require('../models/conversations.models')
const uuid = require('uuid')
const Users = require('../models/users.models')

const getAllConversations = async() => {
    const data = await Conversations.findAll({
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            }
        ],
        attributes: {
            exclude: ['userId','createdAt', 'updatedAt']
        }
    })
    return data
}

const getConversationById = async(id) => {
    const data = await Conversations.findOne({
        where: {
            id
        },
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            }
        ],
        attributes: {
            exclude: ['userId','createdAt', 'updatedAt']
        }
    })
    return data
}

const createConversation = async (data) => {
    const response = await Conversations.create({
        id: uuid.v4(),
        title: data.title,
        imageUrl: data.imageUrl,
        userId: data.userId
    })
    return response
}

const updateConversation = async (id, data) => {
    const result = await Conversations.update(data, {
        where: {
            id
        }
    })
    return result
}

const deleteConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    getAllConversations,
    getConversationById,
    createConversation,
    updateConversation,
    deleteConversation
}