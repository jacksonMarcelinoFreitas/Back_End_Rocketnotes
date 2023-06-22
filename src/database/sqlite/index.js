const sqlite3 = require('sqlite3'); //driver
const sqlite = require('sqlite'); //bd
const path = require('path')

async function sqliteConnection(){
    const database = await sqlite.open({
        filename: path.resolve(__dirname,'..', 'database.db'), //este trecho resolve o acesso a pasta em diferentes SO
        driver: sqlite3.Database
});

    return database;
}

module.exports = sqliteConnection;