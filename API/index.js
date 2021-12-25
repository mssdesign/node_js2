const express = require('express')
const app = express()

//Executando funções do express e utilizando middleware para ler a requisição em JSON
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//Rotas - endpoints
app.get('/', (req, res) => {

    //Criando resposta da api:
    res.json({message: 'Primeira rota criada'})

})

app.listen(3000)