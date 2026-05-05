import Database from 'better-sqlite3';

const db: Database.Database = new Database('mydb.sqlite');

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`).run();

export default db;