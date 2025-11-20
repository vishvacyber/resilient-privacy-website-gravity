import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function resetAdmin() {
    const db = await open({
        filename: path.join(__dirname, 'database.sqlite'),
        driver: sqlite3.Database
    });

    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Check if admin exists
    const admin = await db.get('SELECT * FROM admins WHERE username = ?', ['admin']);

    if (admin) {
        await db.run('UPDATE admins SET password_hash = ? WHERE username = ?', [hashedPassword, 'admin']);
        console.log('Admin password updated to: admin123');
    } else {
        await db.run('INSERT INTO admins (username, password_hash) VALUES (?, ?)', ['admin', hashedPassword]);
        console.log('New admin created: admin / admin123');
    }
}

resetAdmin().catch(console.error);
