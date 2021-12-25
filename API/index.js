// AULA 232 CURSO DE NODE MAESTRIA
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

app.post('/createproduct', (req, res) => {
    const name = req.body.name
    const price = req.body.price

    console.log(name, price)    //Ou salvar no banco
    res.json({message: 'O produto foi criado!'}) //resposta da requisição
})

app.listen(3000)