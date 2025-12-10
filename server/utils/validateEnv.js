/**
 * Environment Variable Validator
 * Validates required environment variables on server startup
 * Fails fast if critical variables are missing or invalid
 */

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

/**
 * Validate JWT secret strength
 */
function validateJWTSecret(secret) {
    if (!secret) {
        throw new ValidationError('JWT_SECRET is required but not set');
    }

    const isProduction = process.env.NODE_ENV === 'production';

    // In production, enforce strong secret requirements
    if (isProduction) {
        if (secret.length < 32) {
            throw new ValidationError(
                'JWT_SECRET must be at least 32 characters in production. ' +
                'Generate a strong secret: openssl rand -base64 32'
            );
        }

        // Check for common weak patterns
        const weakPatterns = [
            'secret',
            'password',
            'admin',
            '123456',
            'test',
            'development',
            'fallback',
        ];

        const lowerSecret = secret.toLowerCase();
        for (const pattern of weakPatterns) {
            if (lowerSecret.includes(pattern)) {
                console.warn(
                    `⚠️  WARNING: JWT_SECRET contains weak pattern "${pattern}". ` +
                    'Consider using a stronger, randomly generated secret.'
                );
            }
        }
    } else {
        // In development, just warn if too short
        if (secret.length < 16) {
            console.warn(
                '⚠️  WARNING: JWT_SECRET is short. While acceptable for development, ' +
                'use a longer secret in production.'
            );
        }
    }

    return true;
}

/**
 * Validate database configuration
 */
function validateDatabase() {
    // SQLite is used, so just check if path is reasonable
    const dbPath = process.env.DATABASE_PATH || './server/database.sqlite';

    if (dbPath.includes('..') || dbPath.startsWith('/')) {
        console.warn(
            '⚠️  WARNING: DATABASE_PATH uses absolute or parent paths. ' +
            'This might cause issues in containerized environments.'
        );
    }

    return true;
}

/**
 * Validate port configuration
 */
function validatePort() {
    const port = parseInt(process.env.PORT || '5001', 10);

    if (isNaN(port) || port < 1 || port > 65535) {
        throw new ValidationError(
            `PORT must be a valid port number (1-65535), got: ${process.env.PORT}`
        );
    }

    if (port < 1024 && process.platform !== 'win32') {
        console.warn(
            `⚠️  WARNING: PORT ${port} requires elevated privileges on Unix systems. ` +
            'Consider using a port >= 1024.'
        );
    }

    return true;
}

/**
 * Validate CORS configuration
 */
function validateCORS() {
    const corsOrigin = process.env.CORS_ORIGIN;
    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction && (!corsOrigin || corsOrigin === '*')) {
        console.warn(
            '⚠️  WARNING: CORS_ORIGIN not set or set to "*" in production. ' +
            'This allows requests from any origin, which is a security risk. ' +
            'Set CORS_ORIGIN to your frontend URL.'
        );
    }

    return true;
}

/**
 * Main validation function
 * Call this on server startup to validate all environment variables
 */
export function validateEnvironment() {
    const errors = [];
    const warnings = [];

    console.log('🔍 Validating environment configuration...');

    try {
        // Validate JWT Secret (critical)
        validateJWTSecret(process.env.JWT_SECRET);
        console.log('✅ JWT_SECRET validated');
    } catch (error) {
        errors.push(error.message);
    }

    try {
        // Validate Database
        validateDatabase();
        console.log('✅ Database configuration validated');
    } catch (error) {
        errors.push(error.message);
    }

    try {
        // Validate Port
        validatePort();
        console.log('✅ Port configuration validated');
    } catch (error) {
        errors.push(error.message);
    }

    try {
        // Validate CORS
        validateCORS();
        console.log('✅ CORS configuration validated');
    } catch (error) {
        warnings.push(error.message);
    }

    // If there are errors, fail startup
    if (errors.length > 0) {
        console.error('\n❌ ENVIRONMENT VALIDATION FAILED\n');
        console.error('The following critical errors were found:\n');
        errors.forEach((error, index) => {
            console.error(`${index + 1}. ${error}`);
        });
        console.error('\nPlease fix these errors and restart the server.');
        console.error('See .env.example for configuration examples.\n');

        throw new ValidationError(
            'Environment validation failed. Check the errors above.'
        );
    }

    console.log('\n✅ Environment validation successful\n');
    return true;
}

export default validateEnvironment;
