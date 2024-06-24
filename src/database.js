import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

let db;
export async function createConnection() {
  db = new LowSync(new JSONFileSync('db.json'), {});
  await db.read();
  db.data ||= { tasks: [] };
  await db.write();
}

export const getConnection = () => db;
