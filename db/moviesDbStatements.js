const db = require('./index')

const createMoviesDB = () => {
    db.serialize(function () {
        db.run(`CREATE TABLE movies (movieName TEXT, rating INTEGER, comment TEXT, deleted INTEGER)`);
    })
}

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