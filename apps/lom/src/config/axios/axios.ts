export default function axiosConfig() {
    // Axios configuration can be set here
    // For example, setting base URL, headers, etc.
    return {
        baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    };
}
