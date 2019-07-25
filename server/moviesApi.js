const router = require('express').Router();
const request = require('request');
const { db } = require('../db');
const multer = require ('multer');
const OMDB_API_KEY = require('../apiKey')
const OMDB_API = "http://www.omdbapi.com"

const upload = multer();

router.post('/', upload.fields([]), (req, res, next) => {
    let title = req.body.name
    console.log("===== ", req.body);
    console.log('TITLE:', title);
    request.post(`${OMDB_API}/?apikey=${OMDB_API_KEY}&t=${title}`, (err, response) => {
        if (err) {
            return next(err);
        }
        const movieInfo = response.body;
        console.log(JSON.parse(movieInfo))
        res.render('searchResult', { result: JSON.parse(movieInfo) });
        // res.send({movieInfo})
    });
})

module.exports = router