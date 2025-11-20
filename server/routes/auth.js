import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../database.js';

const router = express.Router();
const JWT_SECRET = 'your-secret-key-change-in-production'; // In a real app, use env var

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = getDb();

    try {
        console.log('Login attempt for:', username);
        const admin = await db.get('SELECT * FROM admins WHERE username = ?', [username]);

        if (!admin) {
            console.log('User not found');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password_hash);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });

        res.json({ token, username: admin.username });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
