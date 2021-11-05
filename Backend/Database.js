var sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcryptjs')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE Meals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            meal text UNIQUE, 
            CONSTRAINT meal_unique UNIQUE (meal)
            )`,
            (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("First start!")
                }
            })
    }
});



module.exports = db