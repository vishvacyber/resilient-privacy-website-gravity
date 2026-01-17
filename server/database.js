import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import logger from './utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

export async function initializeDatabase() {
    db = await open({
        filename: path.join(__dirname, 'database.sqlite'),
        driver: sqlite3.Database
    });

    // Create Admins Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            must_change_password BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Add must_change_password column if it doesn't exist (migration)
    try {
        await db.exec(`ALTER TABLE admins ADD COLUMN must_change_password BOOLEAN DEFAULT 0`);
    } catch {
        // Column already exists, ignore error
    }

    // Create Jobs Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            department TEXT NOT NULL,
            location TEXT NOT NULL,
            type TEXT NOT NULL,
            description TEXT NOT NULL,
            requirements TEXT NOT NULL, -- Stored as JSON string
            is_active BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Create Applications Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_id INTEGER,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            resume_path TEXT,
            cover_letter TEXT,
            work_authorized BOOLEAN,
            requires_sponsorship BOOLEAN,
            veteran_status TEXT,
            disability_status TEXT,
            gender TEXT,
            race_ethnicity TEXT,
            criminal_history BOOLEAN,
            criminal_history_explanation TEXT,
            linkedin_url TEXT,
            current_employer TEXT,
            years_experience INTEGER,
            education_level TEXT,
            start_date TEXT,
            salary_expectations TEXT,
            willing_to_relocate BOOLEAN,
            referral_source TEXT,
            portfolio_url TEXT,
            "references" TEXT,
            status TEXT DEFAULT 'new', -- new, reviewed, interview, rejected, hired
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(job_id) REFERENCES jobs(id)
        )
    `);

    // Create Contacts Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL,
            company TEXT,
            phone TEXT,
            status TEXT DEFAULT 'new', -- new, read, replied
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Create Services Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL CHECK(category IN ('need', 'consulting', 'industry', 'platform')),
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            icon_name TEXT,
            features TEXT NOT NULL,
            highlights TEXT,
            badge TEXT,
            display_order INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Create Documentation Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS documentation (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            file_path TEXT NOT NULL,
            category TEXT DEFAULT 'learning-center',
            description TEXT,
            display_order INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Create Activity Logs Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS activity_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            admin_id INTEGER,
            admin_username TEXT,
            action_type TEXT NOT NULL, -- login, logout, create, update, delete, view
            resource_type TEXT, -- job, application, contact, admin
            resource_id INTEGER,
            details TEXT, -- JSON string with additional details
            ip_address TEXT,
            user_agent TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(admin_id) REFERENCES admins(id)
        )
    `);

    // Create Default Admin if not exists
    const admin = await db.get('SELECT * FROM admins WHERE username = ?', ['admin']);
    if (!admin) {
        const defaultPassword = process.env.INITIAL_ADMIN_PASSWORD || 'admin123';
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        // Set must_change_password to true if using default password
        const mustChangePassword = !process.env.INITIAL_ADMIN_PASSWORD ? 1 : 0;

        await db.run(
            'INSERT INTO admins (username, password_hash, must_change_password) VALUES (?, ?, ?)',
            ['admin', hashedPassword, mustChangePassword]
        );

        logger.warn('⚠️  ----------------------------------------------------------------');
        logger.warn('⚠️  SECURITY ALERT: Default admin account created');
        logger.warn('⚠️  Username: admin');
        logger.warn('⚠️  Password: ' + (process.env.INITIAL_ADMIN_PASSWORD ? '[SET_FROM_ENV]' : 'admin123'));
        if (mustChangePassword) {
            logger.warn('⚠️  ACTION REQUIRED: Change password on first login');
        }
        logger.warn('⚠️  ----------------------------------------------------------------');
    }

    logger.info('Database initialized');
    return db;
}

export function getDb() {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
}
