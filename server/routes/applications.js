import express from 'express';
import multer from 'multer';
import { getDb } from '../database.js';

import { sanitizeInput } from '../utils/sanitizer.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Configure Multer for file uploads with validation
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Sanitize filename and add timestamp
        const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        cb(null, Date.now() + '-' + sanitizedName);
    }
});

// File filter for security
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max file size
    }
});

// POST submit application (Public)
router.post('/', upload.single('resume'), async (req, res) => {
    const {
        job_id, name, email, phone, cover_letter,
        work_authorized, requires_sponsorship,
        veteran_status, disability_status,
        gender, race_ethnicity,
        criminal_history, criminal_history_explanation,
        linkedin_url, current_employer, years_experience,
        education_level, start_date, salary_expectations,
        willing_to_relocate, referral_source, portfolio_url,
        references
    } = req.body;

    // Validate required fields
    if (!job_id || !name || !email) {
        return res.status(400).json({ error: 'Missing required fields: job_id, name, and email are required' });
    }

    const resume_path = req.file ? req.file.path : null;
    const db = getDb();

    try {
        // Check if job exists
        const job = await db.get('SELECT id FROM jobs WHERE id = ? AND is_active = 1', [job_id]);
        if (!job) {
            return res.status(400).json({ error: 'Invalid job_id: Job not found or inactive' });
        }

        // Convert string booleans to integers for SQLite
        const boolToInt = (val) => val === 'true' || val === true ? 1 : 0;

        await db.run(
            `INSERT INTO applications (
                job_id, name, email, phone, resume_path, cover_letter,
                work_authorized, requires_sponsorship,
                veteran_status, disability_status,
                gender, race_ethnicity,
                criminal_history, criminal_history_explanation,
                linkedin_url, current_employer, years_experience,
                education_level, start_date, salary_expectations,
                willing_to_relocate, referral_source, portfolio_url,
                references
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                job_id,
                sanitizeInput(name),
                sanitizeInput(email),
                sanitizeInput(phone),
                resume_path,
                sanitizeInput(cover_letter),
                boolToInt(work_authorized),
                boolToInt(requires_sponsorship),
                sanitizeInput(veteran_status),
                sanitizeInput(disability_status),
                sanitizeInput(gender),
                sanitizeInput(race_ethnicity),
                boolToInt(criminal_history),
                sanitizeInput(criminal_history_explanation),
                sanitizeInput(linkedin_url),
                sanitizeInput(current_employer),
                years_experience, // Should be integer
                sanitizeInput(education_level),
                sanitizeInput(start_date),
                sanitizeInput(salary_expectations),
                boolToInt(willing_to_relocate),
                sanitizeInput(referral_source),
                sanitizeInput(portfolio_url),
                sanitizeInput(references)
            ]
        );
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        logger.error('Error submitting application:', error);
        res.status(500).json({ error: 'Failed to submit application' });
    }
});



export default router;
