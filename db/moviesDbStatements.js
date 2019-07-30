const db = require('./index')

const createMoviesTable = () => {
    db.serialize(() => {
        db.run(`CREATE TEMPORARY TABLE favorites (movieName TEXT, rating INTEGER, comment TEXT)`);
        console.log("Movie DB created.")
    })
}

const saveMovie = "INSERT INTO favorites VALUES (?,?,?)"
const updateMovie = "UPDATE favorites SET rating = ? WHERE movieName = ?"
const fetchSavedMovies = "SELECT * FROM favorites"

module.exports = {createMoviesTable, saveMovie, updateMovie, fetchSavedMovies}
