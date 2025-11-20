import express from 'express';
import multer from 'multer';
import path from 'path';
import { getDb } from '../database.js';
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Middleware to check auth
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    next();
};

// POST submit application (Public)
router.post('/', upload.single('resume'), async (req, res) => {
    const { job_id, name, email, phone, cover_letter } = req.body;
    const resume_path = req.file ? req.file.path : null;
    const db = getDb();

    try {
        await db.run(
            `INSERT INTO applications (job_id, name, email, phone, resume_path, cover_letter) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [job_id, name, email, phone, resume_path, cover_letter]
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

export default router;
