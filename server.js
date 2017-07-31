const express = require('express-sessions')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressSessions = require('express-sessions')

const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', './templates')
app.set('views engine', 'mustache')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
