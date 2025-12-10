import { getDb } from '../database.js';
import logger from '../utils/logger.js';

/**
 * Middleware to log admin activities
 * @param {string} actionType - Type of action (create, update, delete, view, login, logout)
 * @param {string} resourceType - Type of resource (job, application, contact, admin)
 */
export const logActivity = (actionType, resourceType) => {
    return async (req, res, next) => {
        // Store original methods
        const originalJson = res.json;
        const originalSend = res.send;

        // Override res.json to capture response
        res.json = function (data) {
            // Log activity after successful response
            if (res.statusCode >= 200 && res.statusCode < 300) {
                logActivityToDatabase(req, actionType, resourceType, data).catch(err => {
                    logger.error('Failed to log activity:', err);
                });
            }
            return originalJson.call(this, data);
        };

        // Override res.send similarly
        res.send = function (data) {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                logActivityToDatabase(req, actionType, resourceType, data).catch(err => {
                    logger.error('Failed to log activity:', err);
                });
            }
            return originalSend.call(this, data);
        };

        next();
    };
};

/**
 * Log activity directly (for login/logout)
 */
export const logActivityDirect = async (req, actionType, resourceType, details = {}) => {
    return logActivityToDatabase(req, actionType, resourceType, details);
};

/**
 * Internal function to write activity log to database
 */
async function logActivityToDatabase(req, actionType, resourceType, responseData) {
    try {
        const db = getDb();

        // Extract admin info from request (set by auth middleware)
        const adminId = req.user?.id || null;
        const adminUsername = req.user?.username || 'unknown';

        // Extract resource ID from various sources
        let resourceId = null;
        if (responseData?.id) {
            resourceId = responseData.id;
        } else if (req.params?.id) {
            resourceId = parseInt(req.params.id);
        } else if (responseData?.lastID) {
            resourceId = responseData.lastID;
        }

        // Get IP address
        const ipAddress = req.ip || req.connection?.remoteAddress || 'unknown';

        // Get user agent
        const userAgent = req.get('user-agent') || 'unknown';

        // Prepare details (sanitize sensitive data)
        const details = JSON.stringify({
            method: req.method,
            path: req.path,
            resourceId: resourceId,
            timestamp: new Date().toISOString()
        });

        // Insert activity log
        await db.run(
            `INSERT INTO activity_logs 
             (admin_id, admin_username, action_type, resource_type, resource_id, details, ip_address, user_agent) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [adminId, adminUsername, actionType, resourceType, resourceId, details, ipAddress, userAgent]
        );
    } catch (error) {
        // Don't throw error - logging should not break the main flow
        logger.error('Activity logging error:', error);
    }
}
