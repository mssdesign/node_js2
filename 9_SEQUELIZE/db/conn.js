const { Sequelize } = require('sequelize')      //Importando apenas um componente do sequelize e não ele inteiro

const sequelize = new Sequelize('nodesequelize2', 'root', '', {     //nome do banco, usuário, senha, configurações
    host: 'localhost',
    dialect: 'mysql'
})

////O módulo abaixo não é o mais adequado pois captura os dados em um momento mas não mantém a conexão
// try{

//     sequelize.authenticate()
//     console.log('Conectamos com sucesso com o sequelize!')

// } catch(err) {
//     console.log('Não foi possível conectar: ', err)
// }

module.exports = sequelize;