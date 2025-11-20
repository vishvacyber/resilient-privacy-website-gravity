import express from 'express';
import { getDb } from '../database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET activity logs with pagination and filtering
router.get('/', authenticate, async (req, res) => {
    const db = getDb();
    const {
        page = 1,
        limit = 50,
        action_type,
        resource_type,
        admin_username,
        start_date,
        end_date
    } = req.query;

    try {
        // Build WHERE clause based on filters
        let whereConditions = [];
        let params = [];

        if (action_type) {
            whereConditions.push('action_type = ?');
            params.push(action_type);
        }

        if (resource_type) {
            whereConditions.push('resource_type = ?');
            params.push(resource_type);
        }

        if (admin_username) {
            whereConditions.push('admin_username = ?');
            params.push(admin_username);
        }

        if (start_date) {
            whereConditions.push('created_at >= ?');
            params.push(start_date);
        }

        if (end_date) {
            whereConditions.push('created_at <= ?');
            params.push(end_date);
        }

        const whereClause = whereConditions.length > 0
            ? 'WHERE ' + whereConditions.join(' AND ')
            : '';

        // Get total count
        const countQuery = `SELECT COUNT(*) as total FROM activity_logs ${whereClause}`;
        const { total } = await db.get(countQuery, params);

        // Get paginated logs
        const offset = (page - 1) * limit;
        const logsQuery = `
            SELECT * FROM activity_logs 
            ${whereClause}
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?
        `;
        const logs = await db.all(logsQuery, [...params, limit, offset]);

        res.json({
            logs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching activity logs:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET activity log statistics
router.get('/stats', authenticate, async (req, res) => {
    const db = getDb();

    try {
        const stats = await db.all(`
            SELECT 
                action_type,
                COUNT(*) as count
            FROM activity_logs
            WHERE created_at >= datetime('now', '-30 days')
            GROUP BY action_type
            ORDER BY count DESC
        `);

        res.json(stats);
    } catch (error) {
        console.error('Error fetching activity stats:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
