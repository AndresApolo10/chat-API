const messageControllers = require('./messages.controller')

const createMessage = (req, res) => {
    const userId = req.user.id
    const conversationId = req.params.id
    const { message } = req.body

    if(message){
        messageControllers.createMessage({message, userId, conversationId})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })     
    } else {
        res.status(400).json({
            message: 'Missing Data',
            fields: {
                message: 'string'
            }
        })
    }
}

const getMessagesByConversation = (req, res) => {
    const conversationId = req.params.id
    messageControllers.getMessagesByConversation(conversationId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const getMessageById = (req, res) => {
    const id = req.params.id

    messageControllers.getMessageById(id)
        .then(data => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const deleteMessage = (req, res) => {
    const id = req.params.id
    messageControllers.deleteMessage(id)
        .then(data => {
            if(data){
                res.status(204).json()
            } else {
                res.status(400).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

module.exports = {
    createMessage,
    getMessagesByConversation,
    getMessageById,
    deleteMessage
}