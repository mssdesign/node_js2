const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User') //Não é preciso utilizar para criar a tabela tendo o caminho do arquivo aqui o sequelize entende e mapeia ele criando a tabela ao iniciar a aplicação

const app = express()

//ATENÇÃO OCORREU UM ERRO AO INICIAR ESSE APP PARA RESOLVER FOI INSTALADO O mysql2 a partir do comando npm install mysql2

app.use(
  //Utilizando middleware para pegar dados do url
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json()) //Transformando dados do url em json

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('public')) //Ponte para arquivos estáticos

app.get('/users/create', (req, res) => {
  res.render('adduse')
})

app.post('/users/create', async (req, res) => {
  //Os dados abaixo são apenas didático. É preciso tratar os dados em uma aplicação real por motivo de segurança
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if (newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false //Necessário para a variável não ficar nula
  }

  console.log(req.body)

  await User.create({ name, occupation, newsletter }) //Com isso é possível criar as querys no bando de dados automaticamente com o sequelize o await garante que o redirecionamento so irá acontecer após o usuário ser criado

  res.redirect('/')
})

app.get('/users/:id', async (req, res) => {
  //Pegando ID dinamicamente do url utilizando sequelize
  const id = req.params.id

  const user = await User.findOne({ raw: true, where: { id: id } }) //Pegando 1 usuário da tabela

  res.render('userview', { user }) //Renderizando html do handlebars com o nome userview
})

app.post('/users/delete/:id', async (req, res) => {
  //Deletando usuários

  const id = req.params.id

  await User.destroy({ where: { id: id } })

  res.redirect('/')
})

app.get('/users/edit/:id', async (req, res) => {
  //Pegando usuários para edição

  const id = req.params.id

  const user = await User.findOne({ raw: true, where: { id: id } }) //raw permite utilizar o dado

  res.render('useredit', { user })
})

app.post('/users/update', async (req, res) => {
  //Editando usuários

  const id = req.body.id
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if(newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }

  const userData = {
    id,     //Abreviação de "id: id" -> mesmo nome já atribui o valor à variável (destructuring)
    name, 
    occupation,
    newsletter
  }

  await User.update(userData, { where: {id: id} })  //Atenção ao trabalhar com SeQueLize "User" utilize o where para filtrar 

  res.redirect('/')

})

app.get('/', async (req, res) => {
  const users = await User.findAll({ raw: true })

  console.log(users)

  res.render('home', { users: users })
})

conn
  .sync() //.sync({force: true})  //Recria as tabelas e apaga os dados a partir do momento que salva
  .then(() => {
    //A aplicação só vai funcionar quando as tabelas necessárias forem criadas
    app.listen(3000)
  })
  .catch((err) => console.log(err))
  