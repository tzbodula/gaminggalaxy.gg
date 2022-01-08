const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/aboutus', (req, res) => {
    res.render('aboutus')
})

router.get('/termsofservice', (req, res) => {
    res.render('termsofservice')
})

router.get('/privacypolicy', (req, res) => {
    res.render('privacypolicy')
})

router.get('/contactus', (req, res) => {
    res.render('contactus')
})

router.get('/livestreaming', (req, res) => {
    res.render('livestreaming')
})

router.get('/videoproduction', (req, res) => {
    res.render('videoproduction')
})

router.get('/socialmedia', (req, res) => {
    res.render('socialmedia')
})

router.get('/freestuff', (req, res) => {
    res.render('freestuff')
})

router.get('/tutorials', (req, res) => {
    res.render('tutorials')
})

router.get('/madden', (req, res) => {
    res.render('madden')
})

router.get('/bronze', (req, res) => {
    res.render('bronze')
})

router.get('/silver', (req, res) => {
    res.render('silver')
})

router.get('/gold', (req, res) => {
    res.render('gold')
})

router.get('/galactic', (req, res) => {
    res.render('galactic')
})

router.get('/customizedmerch', (req, res) => {
    res.render('customizedmerch')
})

router.get('/galaxymerch', (req, res) => {
    res.render('galaxymerch')
})



module.exports = router