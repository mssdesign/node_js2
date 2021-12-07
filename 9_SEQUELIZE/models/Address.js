const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const User = require('./User')

//Criando tabela address no banco SQL
const Address = db.define('Address', {

    street: {
        type: DataTypes.STRING,
        required: true,
    },
    number: {
        type: DataTypes.STRING,
        required: true,
    },
    city: {
        type: DataTypes.STRING,
        required: true,
    }

})

//Criando relacionamento entre as tabelas User e Address
Address.belongsTo(User)

module.exports = Address