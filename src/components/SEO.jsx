import { useEffect } from 'react';

/**
 * SEO Component for managing page-level meta tags using native DOM manipulation
 * Compatible with React 19+
 * 
 * @param {Object} props
 * @param {string} props.title - Page title (will be suffixed with site name)
 * @param {string} props.description - Page meta description
 * @param {string} props.keywords - Comma-separated keywords
 * @param {string} props.canonical - Canonical URL (defaults to current page)
 * @param {string} props.ogImage - Open Graph image URL (defaults to company logo)
 * @param {string} props.ogType - Open Graph type (default: 'website')
 */
const SEO = ({
    title = 'Enterprise API Security & WAAP Solutions',
    description = 'AI-driven API security platform for enterprise protection. WAAP (Web Application & API Protection), real-time threat detection, OWASP Top 10 defense, and zero-trust architecture.',
    keywords = 'API Security, WAAP, Web Application Protection, Cybersecurity, Enterprise Security, Threat Detection, Zero Trust, Data Privacy',
    canonical,
    ogImage = 'https://www.resilientprivacy.com/company_logo.jpg',
    ogType = 'website'
}) => {
    const siteName = 'Resilient Privacy Inc.';
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
    const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : 'https://www.resilientprivacy.com');

    useEffect(() => {
        // Update document title
        document.title = fullTitle;

        // Helper function to set or update meta tag
        const setMetaTag = (selector, attribute, content) => {
            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement('meta');
                if (selector.includes('property=')) {
                    element.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
                } else {
                    element.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
                }
                document.head.appendChild(element);
            }
            element.setAttribute(attribute, content);
        };

        // Primary meta tags
        setMetaTag('meta[name="title"]', 'content', fullTitle);
        setMetaTag('meta[name="description"]', 'content', description);
        setMetaTag('meta[name="keywords"]', 'content', keywords);

        // Open Graph
        setMetaTag('meta[property="og:type"]', 'content', ogType);
        setMetaTag('meta[property="og:url"]', 'content', currentUrl);
        setMetaTag('meta[property="og:title"]', 'content', fullTitle);
        setMetaTag('meta[property="og:description"]', 'content', description);
        setMetaTag('meta[property="og:image"]', 'content', ogImage);

        // Twitter Card
        setMetaTag('meta[property="twitter:card"]', 'content', 'summary_large_image');
        setMetaTag('meta[property="twitter:url"]', 'content', currentUrl);
        setMetaTag('meta[property="twitter:title"]', 'content', fullTitle);
        setMetaTag('meta[property="twitter:description"]', 'content', description);
        setMetaTag('meta[property="twitter:image"]', 'content', ogImage);

        // Canonical link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', currentUrl);
    }, [fullTitle, description, keywords, currentUrl, ogImage, ogType]);

    return null; // This component doesn't render anything
};

export default SEO;
