const express = require('express')
const exphbs = require('express-handlebars').engine

const app = express() //invocando express

const conn = require('./db/conn') //Chamando a conexão com o banco de dados em SQL

const Task = require('./models/Task')

app.engine('handlebars', exphbs()) //Invocar o express-handlebars
app.set('view engine', 'handlebars') //Definindo a engine

app.use(
  //Middleware que permiter ler o que vem no corpo da requisição
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

app.use(express.static('public'))

conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
