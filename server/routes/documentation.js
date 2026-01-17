import express from 'express';
import { getDb } from '../database.js';
import { authenticate } from '../middleware/auth.js';
import logger from '../utils/logger.js';

const router = express.Router();

// GET all documentation (optionally filter by category)
router.get('/', async (req, res) => {
    try {
        const db = getDb();
        const { category } = req.query;

        let query = 'SELECT * FROM documentation WHERE is_active = 1 ORDER BY display_order ASC, id ASC';
        let params = [];

        if (category) {
            query = 'SELECT * FROM documentation WHERE category = ? AND is_active = 1 ORDER BY display_order ASC, id ASC';
            params = [category];
        }

        const docs = await db.all(query, params);
        res.json(docs);
    } catch (error) {
        logger.error('Error fetching documentation:', error);
        res.status(500).json({ error: 'Failed to fetch documentation' });
    }
});

// GET single documentation by slug
router.get('/:slug', async (req, res) => {
    try {
        const db = getDb();
        const doc = await db.get('SELECT * FROM documentation WHERE slug = ?', [req.params.slug]);

        if (!doc) {
            return res.status(404).json({ error: 'Documentation not found' });
        }

        res.json(doc);
    } catch (error) {
        logger.error('Error fetching documentation:', error);
        res.status(500).json({ error: 'Failed to fetch documentation' });
    }
});

import { sanitizeInput } from '../utils/sanitizer.js';

// ... imports ...

// POST create documentation (admin only)
router.post('/', authenticate, async (req, res) => {
    try {
        const db = getDb();
        const { title, slug, file_path, category, description, display_order } = req.body;

        // Validation
        if (!title || !slug || !file_path) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if slug already exists
        const existing = await db.get('SELECT id FROM documentation WHERE slug = ?', [slug]);
        if (existing) {
            return res.status(400).json({ error: 'Slug already exists' });
        }

        const result = await db.run(`
            INSERT INTO documentation (title, slug, file_path, category, description, display_order)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [
            sanitizeInput(title),
            sanitizeInput(slug),
            sanitizeInput(file_path),
            category ? sanitizeInput(category) : 'learning-center',
            description ? sanitizeInput(description) : null,
            display_order || 0
        ]);

        res.status(201).json({ id: result.lastID, message: 'Documentation created successfully' });
    } catch (error) {
        logger.error('Error creating documentation:', error);
        res.status(500).json({ error: 'Failed to create documentation' });
    }
});

// PUT update documentation (admin only)
router.put('/:id', authenticate, async (req, res) => {
    try {
        const db = getDb();
        const { title, slug, file_path, category, description, display_order, is_active } = req.body;

        const doc = await db.get('SELECT * FROM documentation WHERE id = ?', [req.params.id]);
        if (!doc) {
            return res.status(404).json({ error: 'Documentation not found' });
        }

        // Check if new slug conflicts with existing
        if (slug && slug !== doc.slug) {
            const existing = await db.get('SELECT id FROM documentation WHERE slug = ? AND id != ?', [slug, req.params.id]);
            if (existing) {
                return res.status(400).json({ error: 'Slug already exists' });
            }
        }

        await db.run(`
            UPDATE documentation
            SET title = ?, slug = ?, file_path = ?, category = ?, description = ?, 
                display_order = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `, [
            title ? sanitizeInput(title) : doc.title,
            slug ? sanitizeInput(slug) : doc.slug,
            file_path ? sanitizeInput(file_path) : doc.file_path,
            category ? sanitizeInput(category) : doc.category,
            description !== undefined ? sanitizeInput(description) : doc.description,
            display_order !== undefined ? display_order : doc.display_order,
            is_active !== undefined ? is_active : doc.is_active,
            req.params.id
        ]);

        res.json({ message: 'Documentation updated successfully' });
    } catch (error) {
        logger.error('Error updating documentation:', error);
        res.status(500).json({ error: 'Failed to update documentation' });
    }
});

// DELETE documentation (admin only)
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const db = getDb();
        const result = await db.run('DELETE FROM documentation WHERE id = ?', [req.params.id]);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Documentation not found' });
        }

        res.json({ message: 'Documentation deleted successfully' });
    } catch (error) {
        logger.error('Error deleting documentation:', error);
        res.status(500).json({ error: 'Failed to delete documentation' });
    }
});

export default router;
