import express from 'express';
import multer from 'multer';
import path from 'path';
import { getDb } from '../database.js';
import { authenticate } from '../middleware/auth.js';

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
    const resume_path = req.file ? req.file.path : null;
    const db = getDb();

    try {
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
                job_id, name, email, phone, resume_path, cover_letter,
                work_authorized === 'true' ? 1 : 0,
                requires_sponsorship === 'true' ? 1 : 0,
                veteran_status, disability_status,
                gender, race_ethnicity,
                criminal_history === 'true' ? 1 : 0,
                criminal_history_explanation,
                linkedin_url, current_employer, years_experience,
                education_level, start_date, salary_expectations,
                willing_to_relocate === 'true' ? 1 : 0,
                referral_source, portfolio_url,
                references
            ]
        );
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET all applications (Admin)
router.get('/', authenticate, async (req, res) => {
    const db = getDb();
    try {
        const applications = await db.all(`
            SELECT a.*, j.title as job_title 
            FROM applications a 
            LEFT JOIN jobs j ON a.job_id = j.id 
            ORDER BY a.created_at DESC
        `);
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PATCH update application status (Admin)
router.patch('/:id', authenticate, async (req, res) => {
    const { status } = req.body;
    const db = getDb();

    try {
        await db.run(
            'UPDATE applications SET status = ? WHERE id = ?',
            [status, req.params.id]
        );
        res.json({ message: 'Application status updated' });
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
