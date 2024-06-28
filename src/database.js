import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

let db;
export async function createConnection() {
    db = new LowSync(new JSONFileSync('db.json'), {});
    await db.read();

    // Check if db.data is nullish before assigning a default value
    if (!db.data) {
        db.data = { users: [], tasks: [] };
    } else {
        // Ensure tasks array exists
        db.data.tasks = db.data.tasks || [];
        db.data.users = db.data.users || [];
    }

    await db.write();
}

export const getConnection = () => db;
