if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({
        path: './.env'
    });
}

const cookieParser = require('cookie-parser')
const logger = require('morgan')
const expressValidator = require('express-validator')
const flash = require('express-flash')
const session = require('express-session')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const express = require('express')
const passport = require('passport')
const methodOverride = require('method-override')


const initalizePassport = require('./passport-config')
initalizePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const mysql = require("mysql2")
const db = mysql.createConnection({
    host: process.env.HOST,
    user: 'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.connect( (error) => {
  console.log("Attempting database connection...")
  if(error) {
      console.log("Failed! \n",error)
  } else {
      console.log("MySQL Connected...")
  }
})

const app = express()
const expressLayouts = require('express-ejs-layouts')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const indexRouter = require('./routes/index')

const users = []

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session({}))
app.use(methodOverride('_method'))


app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use("/public", express.static(__dirname + '/public'));

app.use('/', indexRouter)

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log("Attempted to register!")
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

app.delete('/logout', (req, res) => {
    req.logOut()
    req.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(process.env.PORT || 6969)