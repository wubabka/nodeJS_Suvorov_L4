'use strict';

const express = require('express');
const data = require('./parser');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = 8000;

let app = express();

app.set('view engine', 'pug');
app.set('view options', {layout: false});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use('/vendor', express.static('./node_modules'));
app.use(express.static('public'));

app.get('/', function (req, res) {
    let news = req.query.news || req.cookies.news || '10';
    let sites = req.query.sites || req.cookies.sites || 'все';
    res.render('index', {news: news, sites: sites});
});

app.get('/news', function (req, res) {
    res.render('news', {data, news: 10, sites: 'все'});
});

app.post('/news', function (req, res) {
    res.cookie('news', req.body.news);
    res.cookie('sites',req.body.sites);
    res.render('news', {data, news: req.body.news, sites: req.body.sites});
});

app.listen(PORT, function () {
    console.log(`Server is running at port ${PORT}`);
});