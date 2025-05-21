// src/main/db.js
import { JsonDB, Config } from 'node-json-db'

const db = new JsonDB(new Config('data', true, true, '/'))

export default db
