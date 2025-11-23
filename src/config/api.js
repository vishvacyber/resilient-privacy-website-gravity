// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const API_ENDPOINTS = {
    // Auth
    login: `${API_BASE_URL}/api/auth/login`,

    // Services
    services: `${API_BASE_URL}/api/services`,
    servicesById: (id) => `${API_BASE_URL}/api/services/${id}`,

    // Documentation
    documentation: `${API_BASE_URL}/api/documentation`,
    documentationById: (id) => `${API_BASE_URL}/api/documentation/${id}`,

    // Jobs
    jobs: `${API_BASE_URL}/api/jobs`,
    jobsById: (id) => `${API_BASE_URL}/api/jobs/${id}`,

    // Applications
    applications: `${API_BASE_URL}/api/applications`,
    applicationsById: (id) => `${API_BASE_URL}/api/applications/${id}`,

    // Contact
    contact: `${API_BASE_URL}/api/contact`,
    contactById: (id) => `${API_BASE_URL}/api/contact/${id}`,

    // Activity Logs
    activityLogs: `${API_BASE_URL}/api/activity-logs`
};

export default API_BASE_URL;
