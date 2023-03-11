const sqlite = require("sqlite3");
const config = require("../config");

const db = new sqlite.Database(config.DATABASE_NAME);

db.serialize(() => {


});

module.exports = db;
