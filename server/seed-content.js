import { getDb, initializeDatabase } from './database.js';

async function seedContent() {
    await initializeDatabase();
    const db = getDb();

    console.log('Seeding content...');

    // Seed documentation
    await db.run(`DELETE FROM documentation`); // Clear existing

    const docs = [
        {
            title: 'API Security Best Practices',
            slug: 'api-security-best-practices',
            file_path: '/resources/documentation/api-security-best-practices.html',
            category: 'learning-center',
            display_order: 1
        },
        {
            title: 'AI in Cybersecurity',
            slug: 'ai-in-cybersecurity',
            file_path: '/resources/documentation/ai-in-cybersecurity.html',
            category: 'learning-center',
            display_order: 2
        },
        {
            title: 'Zero Trust Security Architecture',
            slug: 'zero-trust-security',
            file_path: '/resources/documentation/zero-trust-security.html',
            category: 'learning-center',
            display_order: 3
        },
        {
            title: 'DevSecOps Best Practices',
            slug: 'devsecops-best-practices',
            file_path: '/resources/documentation/devsecops-best-practices.html',
            category: 'learning-center',
            display_order: 4
        },
        {
            title: 'Ransomware Defense Strategies',
            slug: 'ransomware-defense',
            file_path: '/resources/documentation/ransomware-defense.html',
            category: 'learning-center',
            display_order: 5
        },
        {
            title: 'Supply Chain Security',
            slug: 'supply-chain-security',
            file_path: '/resources/documentation/supply-chain-security.html',
            category: 'learning-center',
            display_order: 6
        }
    ];

    for (const doc of docs) {
        await db.run(`
            INSERT INTO documentation (title, slug, file_path, category, display_order)
            VALUES (?, ?, ?, ?, ?)
        `, [doc.title, doc.slug, doc.file_path, doc.category, doc.display_order]);
    }

    console.log(`✅ Seeded ${docs.length} documentation entries`);

    // Note: Services are extensive - they should be managed via the admin panel
    console.log('ℹ️  Services should be added via the admin panel');
    console.log('✅ Content seeding complete!');
    
    process.exit(0);
}

seedContent().catch(err => {
    console.error('Error seeding content:', err);
    process.exit(1);
});
