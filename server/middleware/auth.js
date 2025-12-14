import jwt from 'jsonwebtoken';
import { getDb } from '../database.js';

// JWT secret is required - validated on startup
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach user info to request
        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        return res.status(500).json({ error: 'Authentication error' });
    }
};

export const authenticateAdmin = async (req, res, next) => {
    try {
        // First run standard auth
        await authenticate(req, res, async () => {
            // Then verify admin exists in DB (avoids stale tokens)
            const db = getDb();
            const admin = await db.get('SELECT id FROM admins WHERE id = ?', [req.user.id]);

            if (!admin) {
                return res.status(401).json({ error: 'Invalid admin credentials' });
            }

            next();
        });
    } catch (error) {
        res.status(500).json({ error: 'Authentication error' });
    }
};
