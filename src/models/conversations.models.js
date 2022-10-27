const db = require('../utils/database')
const {DataTypes} = require('sequelize')
const Users = require('./users.models')

const Conversations = db.define('conversations', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
            key: 'id',
            model: Users
        }
    }
})

module.exports = Conversations