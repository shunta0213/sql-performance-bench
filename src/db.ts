import { Database } from "sqlite3";

async function createDB() {
  const db = new Database("data/test.db");

  db.run(`DROP TABLE IF EXISTS users`);
  db.run(`DROP TABLE IF EXISTS articles`);
}

createDB();
