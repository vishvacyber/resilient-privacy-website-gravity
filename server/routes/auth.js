import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../database.js';
import { logActivityDirect } from '../middleware/activityLogger.js';
import logger from '../utils/logger.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// JWT secret is now required - validated on startup
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = getDb();

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

        const token = jwt.sign(
            {
                id: admin.id,
                username: admin.username,
                mustChangePassword: admin.must_change_password === 1
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Log successful login
        await logActivityDirect(req, 'login', 'admin', {
            admin_id: admin.id,
            admin_username: admin.username
        });

        logger.info(`Admin login successful: ${admin.username}`);

        res.json({
            token,
            username: admin.username,
            mustChangePassword: admin.must_change_password === 1
        });
    } catch (error) {
        logger.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Change password endpoint
router.post('/change-password', authenticate, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const db = getDb();

    try {
        // Validate new password strength
        if (!newPassword || newPassword.length < 12) {
            return res.status(400).json({
                error: 'Password must be at least 12 characters long'
            });
        }

        // Check password complexity
        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasLowerCase = /[a-z]/.test(newPassword);
        const hasNumbers = /\d/.test(newPassword);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

        if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
            return res.status(400).json({
                error: 'Password must contain uppercase, lowercase, numbers, and special characters'
            });
        }

        // Get current admin
        const admin = await db.get('SELECT * FROM admins WHERE id = ?', [req.user.id]);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, admin.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear must_change_password flag
        await db.run(
            'UPDATE admins SET password_hash = ?, must_change_password = 0 WHERE id = ?',
            [hashedPassword, req.user.id]
        );

        // Log activity
        await logActivityDirect(req, 'update', 'admin', {
            admin_id: req.user.id,
            admin_username: req.user.username,
            action: 'password_change'
        });

        logger.info(`Password changed for admin: ${req.user.username}`);

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        logger.error('Password change error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
