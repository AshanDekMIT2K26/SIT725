// Main application controller
class App {
    constructor() {
        this.currentView = 'login';
        this.user = null;
        this.controllers = {
            auth: new AuthController(),
            data: new DataController(),
            report: new ReportController(),
            device: new DeviceController()
        };
        
        this.views = {
            login: new LoginView(),
            dashboard: new DashboardView(),
            reports: new ReportsView(),
            devices: new DevicesView()
        };
        
        this.init();
    }
    
    init() {
        // Check if user is already logged in
        const userData = StorageService.get('user');
        if (userData) {
            this.user = new User(userData);
            this.showView('dashboard');
            this.updateDashboard();
        } else {
            this.showView('login');
        }
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize charts
        this.initCharts();
        
        // Update current date
        this.updateCurrentDate();
    }
    
    setupEventListeners() {
        // Login form submission
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            this.controllers.auth.login(username, password);
        });
        
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const view = e.currentTarget.getAttribute('data-view');
                this.showView(view);
            });
        });
        
        // Logout button
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.controllers.auth.logout();
        });
        
        // Generate report button
        document.getElementById('generate-report').addEventListener('click', () => {
            const reportType = document.getElementById('report-type').value;
            this.controllers.report.generateReport(reportType);
        });
        
        // Add device button
        document.getElementById('add-device-btn').addEventListener('click', () => {
            this.controllers.device.showAddDeviceForm();
        });
        
        // Profile form submission
        document.getElementById('profile-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('profile-name').value;
            const email = document.getElementById('profile-email').value;
            this.controllers.auth.updateProfile({ name, email });
        });
    }
    
    showView(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Show selected view
        if (viewName === 'login') {
            document.getElementById('login-view').classList.add('active');
        } else {
            document.getElementById('dashboard-view').classList.add('active');
            document.getElementById(`${viewName}-content`).classList.add('active');
            document.querySelector(`.nav-item[data-view="${viewName}"]`).classList.add('active');
            
            // Load view-specific data
            if (viewName === 'dashboard') {
                this.updateDashboard();
            } else if (viewName === 'devices') {
                this.controllers.device.loadDevices();
            }
        }
        
        this.currentView = viewName;
    }
    
    updateDashboard() {
        this.controllers.data.loadEnergyData();
        this.controllers.data.loadDeviceStats();
    }
    
    initCharts() {
        // Energy consumption chart
        this.energyChart = new Chart(document.getElementById('energy-chart'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Energy Consumption (kWh)',
                    data: [],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false
                    }
                }
            }
        });
        
        // Device energy chart
        this.deviceChart = new Chart(document.getElementById('device-chart'), {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#3498db',
                        '#e74c3c',
                        '#2ecc71',
                        '#f39c12',
                        '#9b59b6'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
        
        // Report chart
        this.reportChart = new Chart(document.getElementById('report-chart'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Energy Consumption',
                    data: [],
                    backgroundColor: '#3498db'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Energy Report'
                    }
                }
            }
        });
    }
    
    updateCurrentDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
    }
    
    updateUserInfo() {
        if (this.user) {
            document.getElementById('user-info').textContent = this.user.name;
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.myEMSApp = new App();
});