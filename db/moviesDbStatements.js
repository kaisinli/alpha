const db = require('./index')

const createMoviesDB = () => {
    db.serialize(function () {
        db.run(`CREATE TABLE movies (movieName TEXT, rating INTEGER, comment TEXT)`);
        console.log("Movie DB created.")
    })
}

<<<<<<< HEAD
const saveMovie = "INSERT INTO movies VALUES (?,?,?)"
const updateMovie = "UPDATE movies SET rating = ? WHERE movieName = ?"
const fetchSavedMovies = "SELECT * FROM movies"

module.exports = {createMoviesDB, saveMovie, updateMovie, fetchSavedMovies}
=======
const saveMovie = (name, rating, comment) => {
    db.serialize(function () {
        let stmt = db.prepare("INSERT INTO movies VALUES (?,?,?,?)");
        stmt.run(name, rating, comment, 0);
        stmt.finalize();
    })
}

const updateMovie = (name, rating, comment) => {
    db.serialize(function () {
        let stmt = db.prepare(
            `UPDATE movies
             SET rating = ?, comment = ?
             WHERE movieName = ?`);
        stmt.run(rating, comment, name);
        stmt.finalize();
    })
}

module.exports = {createMoviesDB, saveMovie, updateMovie}
>>>>>>> 862484d... api works
