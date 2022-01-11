const express = require('express')
const mysql = require("mysql")
const dotenv = require('dotenv');
const bcrypy = require('bcrypt');

dotenv.config({
    path: './.env'
});

console.log("The username is ", process.env.USERNAME)
console.log("The password is ", process.env.PASSWORD)

const db = mysql.createConnection({
    host: 'localhost',
    user: 'zqfarrmy_thomas',
    password: '3Tzc7J#dW*Oy',
    database: 'zqfarrmy_users'
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
app.use(express.urlencoded({ extended: false }))

app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 6969)