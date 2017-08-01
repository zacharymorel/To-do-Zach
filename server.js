const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')

const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(
  expressSession({
    secret: 'han solo',
    resave: false,
    saveUninitialized: true
  })
)

app.get('/', (request, response) => {
  const todoList = request.session.todoList || []
  // console.log(todoList)

 const todoData = {
   uncompleted: todoList.filter(todo => {
     return !todo.completed
   }),
   completed: todoList.filter(todo => {
     return todo.completed
   })
 }
  response.render('home', todoData)
})

app.post('/create', (request, response) => {
  const todoList = request.session.todoList || []
  const getListItem = request.body.listItem

  todoList.push({id: todoList.length + 1, completed: false, listItem: getListItem})
  // console.log(todoList);

  request.session.todoList = todoList

  response.redirect('/')
})

app.post('/markComplete/:id', (request, response) => {
  const todoList = request.session.todoList || []
  const id = parseInt(request.params.id)

  console.log(id);
  console.log(todoList);
  console.log(todoList[id-1])

  const todo = todoList.find(todo => todo.id - 1 === id - 1)

  if (todo) {
    todo.completed = true
    request.session.todoList
  }
  console.log(todo);
  response.redirect('/')
})
app.listen(3000, () => {
  console.log('may the force be with you')
})
