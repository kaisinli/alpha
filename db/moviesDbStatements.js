const db = require('./index')

const createMoviesDB = () => {
    db.serialize(function () {
        db.run(`CREATE TABLE movies (movieName TEXT, rating INTEGER, comment TEXT)`);
        console.log("Movie DB created.")
    })
}

const saveMovie = "INSERT INTO movies VALUES (?,?,?)"
const updateMovie = "UPDATE movies SET rating = ? WHERE movieName = ?"
const fetchSavedMovies = "SELECT * FROM movies"

module.exports = {createMoviesDB, saveMovie, updateMovie, fetchSavedMovies}
