const db = require('./index')

const createMoviesDB = () => {
    db.serialize(function () {
        db.run(`CREATE TABLE movies (movieName TEXT, rating INTEGER, comment TEXT, isDeleted INTEGER)`);
        console.log("Movie DB created.")
    })
}

const saveMovie = "INSERT INTO movies VALUES (?,?,?,?)"
const updateMovie = "UPDATE movies SET rating = ? WHERE movieName = ?"
const fetchSavedMovies = "SELECT * FROM movies WHERE isDeleted = 0"

module.exports = {createMoviesDB, saveMovie, updateMovie, fetchSavedMovies}