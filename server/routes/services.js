import express from 'express';
import { getDb } from '../database.js';
import { authenticateAdmin } from '../middleware/auth.js';
import logger from '../utils/logger.js';

const router = express.Router();

// GET all services (optionally filter by category)
router.get('/', async (req, res) => {
    try {
        const db = getDb();
        const { category } = req.query;

        let query = 'SELECT * FROM services WHERE is_active = 1 ORDER BY display_order ASC, id ASC';
        let params = [];

        if (category) {
            query = 'SELECT * FROM services WHERE category = ? AND is_active = 1 ORDER BY display_order ASC, id ASC';
            params = [category];
        }

        const services = await db.all(query, params);

        // Parse JSON fields
        const parsedServices = services.map(service => ({
            ...service,
            features: JSON.parse(service.features || '[]'),
            highlights: service.highlights ? JSON.parse(service.highlights) : null
        }));

        res.json(parsedServices);
    } catch (error) {
        logger.error('Error fetching services:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// GET single service
router.get('/:id', async (req, res) => {
    try {
        const db = getDb();
        const service = await db.get('SELECT * FROM services WHERE id = ?', [req.params.id]);

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json({
            ...service,
            features: JSON.parse(service.features || '[]'),
            highlights: service.highlights ? JSON.parse(service.highlights) : null
        });
    } catch (error) {
        logger.error('Error fetching service:', error);
        res.status(500).json({ error: 'Failed to fetch service' });
    }
});

import { sanitizeInput } from '../utils/sanitizer.js';

// ... imports ...

// POST create service (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
    try {
        const db = getDb();
        const { category, title, description, icon_name, features, highlights, badge, display_order } = req.body;

        // Validation
        if (!category || !title || !description || !features) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!['need', 'consulting', 'industry', 'platform'].includes(category)) {
            return res.status(400).json({ error: 'Invalid category' });
        }

        const result = await db.run(`
            INSERT INTO services (category, title, description, icon_name, features, highlights, badge, display_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            sanitizeInput(category),
            sanitizeInput(title),
            sanitizeInput(description),
            icon_name ? sanitizeInput(icon_name) : null,
            JSON.stringify(features), // Features is likely an array of strings, should probably sanitize contents too if user generic
            highlights ? JSON.stringify(highlights) : null,
            badge ? sanitizeInput(badge) : null,
            display_order || 0
        ]);
        res.status(201).json({ id: result.lastID, message: 'Service created successfully' });
    } catch (error) {
        logger.error('Error creating service:', error);
        res.status(500).json({ error: 'Failed to create service' });
    }
});

// PUT update service (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
    try {
        const db = getDb();
        const { category, title, description, icon_name, features, highlights, badge, display_order, is_active } = req.body;

        const service = await db.get('SELECT * FROM services WHERE id = ?', [req.params.id]);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        await db.run(`
            UPDATE services
            SET category = ?, title = ?, description = ?, icon_name = ?, features = ?, highlights = ?, 
                badge = ?, display_order = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `, [
            category ? sanitizeInput(category) : service.category,
            title ? sanitizeInput(title) : service.title,
            description ? sanitizeInput(description) : service.description,
            icon_name !== undefined ? sanitizeInput(icon_name) : service.icon_name,
            features ? JSON.stringify(features) : service.features,
            highlights !== undefined ? (highlights ? JSON.stringify(highlights) : null) : service.highlights,
            badge !== undefined ? sanitizeInput(badge) : service.badge,
            display_order !== undefined ? display_order : service.display_order,
            is_active !== undefined ? is_active : service.is_active,
            req.params.id
        ]);
        res.json({ message: 'Service updated successfully' });
    } catch (error) {
        logger.error('Error updating service:', error);
        res.status(500).json({ error: 'Failed to update service' });
    }
});

// DELETE service (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
    try {
        const db = getDb();
        const result = await db.run('DELETE FROM services WHERE id = ?', [req.params.id]);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        logger.error('Error deleting service:', error);
        res.status(500).json({ error: 'Failed to delete service' });
    }
});

export default router;
