class DeviceController {
    constructor() {
        this.view = new DevicesView();
    }
    
    loadDevices() {
        // Simulate API call to get devices
        setTimeout(() => {
            const devices = this.getDevices();
            this.view.displayDevices(devices);
            
            // Add event listeners to action buttons
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
        }, 500);
    }
    
    getDevices() {
        // Return simulated devices
        return [
            new Device({
                id: 1,
                name: 'Living Room Lights',
                type: 'lighting',
                powerRating: 100,
                energyConsumption: 5.2,
                status: 'active',
                lastActive: new Date(),
                location: 'Living Room'
            }),
            new Device({
                id: 2,
                name: 'Kitchen HVAC',
                type: 'heating',
                powerRating: 1500,
                energyConsumption: 28.3,
                status: 'active',
                lastActive: new Date(),
                location: 'Kitchen'
            }),
            new Device({
                id: 3,
                name: 'Office Computer',
                type: 'electronics',
                powerRating: 300,
                energyConsumption: 3.7,
                status: 'inactive',
                lastActive: new Date(Date.now() - 86400000), // 1 day ago
                location: 'Office'
            })
        ];
    }
    
    addDevice(deviceData) {
        // Simulate API call to add device
        setTimeout(() => {
            const newDevice = new Device({
                name: deviceData.name,
                type: deviceData.type,
                powerRating: parseInt(deviceData.powerRating),
                energyConsumption: 0,
                status: 'inactive',
                location: deviceData.location
            });
            
            // Close the modal
            document.getElementById('add-device-modal').remove();
            
            // Reload devices
            this.loadDevices();
            
            // Show success message
            alert(`Device "${newDevice.name}" added successfully!`);
        }, 500);
    }
    
    editDevice(deviceId) {
        // Implementation for editing a device
        alert(`Edit device with ID: ${deviceId}`);
    }
    
    deleteDevice(deviceId) {
        if (confirm('Are you sure you want to delete this device?')) {
            // Simulate API call to delete device
            setTimeout(() => {
                // Reload devices
                this.loadDevices();
                
                // Show success message
                alert('Device deleted successfully!');
            }, 500);
        }
    }
    
    showAddDeviceForm() {
        this.view.showAddDeviceForm();
    }
}