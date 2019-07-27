const router = require('express').Router();
const request = require('request');
const { db } = require('../db');
const multer = require('multer');
const OMDB_API_KEY = require('../apiKey')
const OMDB_API = "http://www.omdbapi.com"

const upload = multer();

router.post('/', upload.fields([]), (req, res, next) => {
    let title = req.body.name
    request.post(`${OMDB_API}/?apikey=${OMDB_API_KEY}&t=${title}&plot=full`, (err, response) => {
        if (err) {
            return next(err);
        }
        const movieInfo = JSON.parse(response.body);
        console.log(movieInfo)

        if (movieInfo.Response === 'False') {
            res.render('noResult')
        } else {
            if(movieInfo.Poster === 'N/A'){
                movieInfo.Poster = 'http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'
            }
            res.render('searchResult', { result: movieInfo });
        }
    });
})

module.exports = router