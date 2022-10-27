const Users = require('./users.models')
const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Participants = require('./participants.models')

const initModels = () => {
    Conversations.belongsTo(Users)
    Users.hasMany(Conversations)

    Messages.belongsTo(Users)
    Users.hasMany(Messages)

    Messages.belongsTo(Conversations)
    Conversations.hasMany(Messages)

    Participants.belongsTo(Conversations)
    Conversations.hasMany(Participants)

    Participants.belongsTo(Users)
    Users.hasMany(Participants)
}

module.exports = initModels