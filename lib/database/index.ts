import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path';

// you would have to import / invoke this in another file
export async function openDb() {
    const pathToDb = path.join(process.cwd(), "db.db");
    return open({
        filename: pathToDb,
        driver: sqlite3.Database
    })
}