const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodemvc2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

try {

    sequelize.authenticate()
    console.log('CONECTADO!')

} catch (error) {
    console.log(`Não conectou ${error}`)
}

exports.default = sequelize
