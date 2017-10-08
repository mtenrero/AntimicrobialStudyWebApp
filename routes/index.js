const path = require('path');
const passport = require('passport');
var express = require('express');

var models = require('../models');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'acceso' , zip: 1});
});

router.get('/login', function (req,res,next) {
    req.breadcrumbs('Acceso');

    res.render('login', { title: 'Login', breadcrumbs: req.breadcrumbs(), zip: 1 });
});



router.post('/login', passport.authenticate('local', {
    successRedirect: '/clinica',
    failureRedirect: '/'
}));


router.get('/stats', function(req, res, next){
    res.render('stats', {title:'Estadísticas'})
    res.redirect('/public/pactivoStats')
});

module.exports = router;
