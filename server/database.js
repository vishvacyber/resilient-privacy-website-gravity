import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

import logger from './utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

export async function initializeDatabase() {
    db = await open({
        filename: path.join(__dirname, 'database.sqlite'),
        driver: sqlite3.Database
    });

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




    logger.info('Database initialized');
    return db;
}

export function getDb() {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
}
