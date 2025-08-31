import ApiService from '../services/ApiService.js';
import Device from '../models/Device.js';

class DeviceController {
    constructor() {
        this.view = new DevicesView();
    }
    
    async loadDevices() {
        try {
            const devices = await ApiService.getDevices();
            this.view.displayDevices(devices);
            
            // Add event listeners
            this.addEventListeners();
        } catch (error) {
            console.error('Error loading devices:', error);
            alert('Failed to load devices');
        }
    }
    
    addEventListeners() {
        document.querySelectorAll('[data-action="edit"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const deviceId = e.target.getAttribute('data-id');
                this.editDevice(deviceId);
            });
        });
        
        document.querySelectorAll('[data-action="delete"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const deviceId = e.target.getAttribute('data-id');
                this.deleteDevice(deviceId);
            });
        });
    }
    
    async addDevice(deviceData) {
        try {
            await ApiService.addDevice(deviceData);
            document.getElementById('add-device-modal').remove();
            this.loadDevices();
            alert('Device added successfully!');
        } catch (error) {
            console.error('Error adding device:', error);
            alert('Failed to add device: ' + error.message);
        }
    }
    
    async editDevice(deviceId) {
        try {
            const device = await ApiService.getDevice(deviceId);
            this.view.showEditDeviceForm(device);
        } catch (error) {
            console.error('Error loading device:', error);
            alert('Failed to load device details');
        }
    }
    
    async updateDevice(deviceData) {
        try {
            await ApiService.updateDevice(deviceData.id, deviceData);
            document.getElementById('edit-device-modal').remove();
            this.loadDevices();
            alert('Device updated successfully!');
        } catch (error) {
            console.error('Error updating device:', error);
            alert('Failed to update device: ' + error.message);
        }
    }
    
    async deleteDevice(deviceId) {
        if (confirm('Are you sure you want to delete this device?')) {
            try {
                await ApiService.deleteDevice(deviceId);
                this.loadDevices();
                alert('Device deleted successfully!');
            } catch (error) {
                console.error('Error deleting device:', error);
                alert('Failed to delete device: ' + error.message);
            }
        }
    }
    
    showAddDeviceForm() {
        this.view.showAddDeviceForm();
    }
}

// export default DeviceController;