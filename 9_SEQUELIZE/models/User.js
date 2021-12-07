//Esse é o modelo
//Observe o nome deste arquivo com a inicial Maiúscula este é um padrão

const { DataTypes } = require('sequelize') //Dá acesso a todos os tipos de dados que existem no banco

const db = require('../db/conn')

//Definindo a estrutura da tabela
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,      //Se apertar Ctrl + space o autocomplete do DataTypes mostra todos os tipos de sql
        allowNull: false             //Permitir dados nulos ou não (no caso não)
    },
    occupation: {
        type: DataTypes.STRING,
        required: true               //Nem vazio nem nulo
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    },
})

module.exports = User