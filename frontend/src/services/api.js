// API Configuration - Automatic environment detection
const getApiUrl = () => {
  // Check if running in production (deployed)
  const isProduction = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1';
  
  if (isProduction) {
    // IMPORTANT: Replace this URL with your actual Render backend URL after deployment
    // Example: 'https://task-management-api.onrender.com/api/v1'
    return 'https://taskflow-1-qsc7.onrender.com/api/v1';
  }
  
  // Default to localhost for development
  return 'http://localhost:5000/api/v1';
};

const API_BASE_URL = getApiUrl();

// For debugging - shows which API URL is being used
console.log('🔗 API Base URL:', API_BASE_URL);

// API Service
const API = {
    // Get token from localStorage
    getToken() {
        return localStorage.getItem('token');
    },

    // Set authorization header
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        return headers;
    },

    // Generic request handler
    async request(endpoint, options = {}) {
        try {
            const url = `${API_BASE_URL}${endpoint}`;
            console.log('📡 Making request to:', url);
            
            const response = await fetch(url, {
                ...options,
                headers: this.getHeaders()
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('❌ API Error:', error);
            throw error;
        }
    },

    // Authentication APIs
    auth: {
        async register(userData) {
            return API.request('/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
        },

        async login(credentials) {
            return API.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials)
            });
        },

        async getMe() {
            return API.request('/auth/me');
        }
    },

    // Task APIs
    tasks: {
        async getAll(params = {}) {
            const queryString = new URLSearchParams(params).toString();
            return API.request(`/tasks${queryString ? '?' + queryString : ''}`);
        },

        async getOne(id) {
            return API.request(`/tasks/${id}`);
        },

        async create(taskData) {
            return API.request('/tasks', {
                method: 'POST',
                body: JSON.stringify(taskData)
            });
        },

        async update(id, taskData) {
            return API.request(`/tasks/${id}`, {
                method: 'PUT',
                body: JSON.stringify(taskData)
            });
        },

        async delete(id) {
            return API.request(`/tasks/${id}`, {
                method: 'DELETE'
            });
        },

        async getStats() {
            return API.request('/tasks/stats');
        }
    }
};
