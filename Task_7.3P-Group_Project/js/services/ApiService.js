class ApiService {
    static baseUrl = 'https://api.myems.com/v1';
    
    static async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const config = { ...defaultOptions, ...options };
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
    
    static async get(endpoint) {
        return this.request(endpoint);
    }
    
    static async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    
    static async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }
    
    static async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE',
        });
    }
    
    // Energy data methods
    static async getEnergyData(startDate, endDate) {
        const endpoint = `/energy?start=${startDate.toISOString()}&end=${endDate.toISOString()}`;
        return this.get(endpoint);
    }
    
    static async getDeviceEnergy(deviceId, period) {
        const endpoint = `/devices/${deviceId}/energy?period=${period}`;
        return this.get(endpoint);
    }
    
    // Device methods
    static async getDevices() {
        return this.get('/devices');
    }
    
    static async addDevice(deviceData) {
        return this.post('/devices', deviceData);
    }
    
    static async updateDevice(deviceId, deviceData) {
        return this.put(`/devices/${deviceId}`, deviceData);
    }
    
    static async deleteDevice(deviceId) {
        return this.delete(`/devices/${deviceId}`);
    }
    
    // Report methods
    static async generateReport(type, startDate, endDate) {
        const endpoint = `/reports?type=${type}&start=${startDate.toISOString()}&end=${endDate.toISOString()}`;
        return this.get(endpoint);
    }
    
    // User methods
    static async login(credentials) {
        return this.post('/auth/login', credentials);
    }
    
    static async logout() {
        return this.post('/auth/logout');
    }
    
    static async updateProfile(profileData) {
        return this.put('/user/profile', profileData);
    }
}