import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/db.json');

export function getDb() {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
}

export function saveDb(data: any) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

export default async function dbConnect() {
    // Ensuring the JSON DB exists
    if (!fs.existsSync(DB_PATH)) {
        saveDb({ categories: [], products: [] });
    }
    return Promise.resolve();
}
