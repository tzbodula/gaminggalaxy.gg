const express = require('express')
const mysql = require("mysql")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'zqfarrmy_thomas',
    password: '3Tzc7J#dW*Oy',
    database: 'zqfarrmy_users'
})

db.connect( (error) => {
  if(error) {
      console.log(error)
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