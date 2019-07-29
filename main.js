'use strict'

const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('./db')

const {createMoviesDB} = require('./db/moviesDbStatements')

createMoviesDB();

//templating
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
const env = nunjucks.configure('views', { noCache: true });

//logging and parsing
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public')));

// api
const MovieRouter = require('./server/moviesApi');

app
    .get('/', (req, res) => {
        res.render('index')
    })
    .use('/movies', MovieRouter)

// error handling endware
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})

//start the server
app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), () => {
    console.log("Listening to port: ", app.get("port"))
})