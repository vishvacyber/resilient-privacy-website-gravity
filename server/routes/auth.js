import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../database.js';
import { logActivityDirect } from '../middleware/activityLogger.js';

const router = express.Router();

// Use environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

// Warn if using fallback secret
if (!process.env.JWT_SECRET) {
    console.warn('⚠️  WARNING: JWT_SECRET not set in environment variables.');
    console.warn('⚠️  Set JWT_SECRET in your .env file for production.');
}

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = getDb();

    // Security: Prevent login if using default secret in production
    if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'fallback-secret-for-development')) {
        console.error('SECURITY CRITICAL: Attempted login with default JWT secret in production.');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const admin = await db.get('SELECT * FROM admins WHERE username = ?', [username]);

        // Security: Use generic error message to prevent user enumeration
        const invalidCredentialsMsg = 'Invalid credentials';

        if (!admin) {
            // Security: Simulate password check time to prevent timing attacks
            await bcrypt.compare('dummy', '$2a$10$dummyhashdummyhashdummyhashdummyhashdummyhash');
            return res.status(401).json({ error: invalidCredentialsMsg });
        }

        const isMatch = await bcrypt.compare(password, admin.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: invalidCredentialsMsg });
        }

        const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });

        // Log successful login
        await logActivityDirect(req, 'login', 'admin', {
            admin_id: admin.id,
            admin_username: admin.username
        });

        res.json({ token, username: admin.username });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
