const router = require('express').Router();
const request = require('request');
const db = require('../db');
const OMDB_API_KEY = require('../apiKey')
const OMDB_API = "http://www.omdbapi.com"

const { saveMovie, updateMovie, fetchSavedMovies } = require('../db/moviesDbStatements')

router.post('/', (req, res, next) => {
    let title = req.body.name
    request.post(`${OMDB_API}/?apikey=${OMDB_API_KEY}&t=${title}`, (err, response) => {
        if (err) {
            return next(err);
        }
        const movieInfo = JSON.parse(response.body);

        if (movieInfo.Response === 'False') {
            res.render('noResult')
        } else {
            if (movieInfo.Poster === 'N/A') {
                movieInfo.Poster = 'http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'
            }
            res.render('searchResult', { results: movieInfo });
        }
    });
})

router.post('/favorites', (req, res, next) => {
    const movie = req.body;
    db.run(saveMovie, [movie.movie, movie.rating, movie.review], (err) => {
        console.log("Saving movie...")
        if (err) {
            console.log(err.message)
            return next(err);
        }

        console.log(`Inserting ${movie.movie}...`)
        
        res.render('successful')
    })
})

router.put('/favorites', (req, res, next) => {
    const movie = req.body
    db.run(updateMovie, [movie.rating, movie.movie], (err) => {
        if (err) {
            console.log(err.message)
            return next(err);
        }

        res.render('successful')
        db.close();
    })
})

router.get('/favorites', (req, res, next) => {
    db.serialize(() => {
        db.all(fetchSavedMovies, [], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            res.render('savedMovies', {results});
            db.close();
        });
    });
})


module.exports = router;
