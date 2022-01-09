const express = require('express')
const mysql = require("mysql")
const dotenv = require('dotenv');

dotenv.config({
    path: './.env'
});

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.connect( (error) => {
  if(error) {
      console.log("DATABASE ERROR", error)
  } else {
      console.log("MySQL Connected...")
  }
})

const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 8080)