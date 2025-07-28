// db/init.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.sqlite");

db.serialize(() => {
  // 1. Create images table
  db.run(`
    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      tags TEXT,
      filename TEXT,
      collection_id INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 2. Create collections table
  db.run(`
    CREATE TABLE IF NOT EXISTS collections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      customer TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
