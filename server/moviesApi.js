const router = require('express').Router();
const request = require('request');
const { db } = require('../db');
const OMDB_API_KEY = require('../apiKey')
const OMDB_API = "http://www.omdbapi.com"

router.post('/', (req, res) => {
    request({
        uri: OMDB_API,
        qs: {
            apikey: OMDB_API_KEY,
            t: req.body.name
        }
    }).pipe(res)
})

module.exports = router