class DevicesView {
    constructor() {
        this.devicesGrid = document.getElementById('devices-grid');
    }
    
    displayDevices(devices) {
        this.devicesGrid.innerHTML = '';
        
        if (devices.length === 0) {
            this.devicesGrid.innerHTML = `
                <div class="no-devices">
                    <i class="fas fa-microchip"></i>
                    <p>No devices found. Add your first device to start monitoring.</p>
                </div>
            `;
            return;
        }
        
        devices.forEach(device => {
            const deviceCard = this.createDeviceCard(device);
            this.devicesGrid.appendChild(deviceCard);
        });
    }
    
    createDeviceCard(device) {
        const card = document.createElement('div');
        card.className = 'device-card';
        
        card.innerHTML = `
            <div class="device-header">
                <h3 class="device-name">${device.name}</h3>
                <span class="device-status ${device.status === 'active' ? 'status-active' : 'status-inactive'}">
                    ${device.status}
                </span>
            </div>
            <div class="device-details">
                <div class="device-detail">
                    <span class="detail-label">Type:</span>
                    <span class="detail-value">${device.type}</span>
                </div>
                <div class="device-detail">
                    <span class="detail-label">Power Rating:</span>
                    <span class="detail-value">${device.powerRating} W</span>
                </div>
                <div class="device-detail">
                    <span class="detail-label">Energy Consumption:</span>
                    <span class="detail-value">${device.energyConsumption.toFixed(2)} kWh</span>
                </div>
                <div class="device-detail">
                    <span class="detail-label">Location:</span>
                    <span class="detail-value">${device.location}</span>
                </div>
            </div>
            <div class="device-actions">
                <button class="btn btn-primary" data-action="edit" data-id="${device.id}">Edit</button>
                <button class="btn btn-secondary" data-action="delete" data-id="${device.id}">Delete</button>
            </div>
        `;
        
        return card;
    }
    
    showAddDeviceForm() {
        // Implementation for showing add device form
        const formHtml = `
            <div class="modal" id="add-device-modal">
                <div class="modal-content">
                    <h2>Add New Device</h2>
                    <form id="add-device-form">
                        <div class="form-group">
                            <label for="device-name">Device Name</label>
                            <input type="text" id="device-name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="device-type">Device Type</label>
                            <select id="device-type" name="type" required>
                                <option value="lighting">Lighting</option>
                                <option value="heating">Heating</option>
                                <option value="cooling">Cooling</option>
                                <option value="appliance">Appliance</option>
                                <option value="electronics">Electronics</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="device-power">Power Rating (W)</label>
                            <input type="number" id="device-power" name="powerRating" required>
                        </div>
                        <div class="form-group">
                            <label for="device-location">Location</label>
                            <input type="text" id="device-location" name="location" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" id="cancel-add-device">Cancel</button>
                            <button type="submit" class="btn btn-primary">Add Device</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', formHtml);
        
        // Add event listeners
        document.getElementById('add-device-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const deviceData = Object.fromEntries(formData.entries());
            window.myEMSApp.controllers.device.addDevice(deviceData);
        });
        
        document.getElementById('cancel-add-device').addEventListener('click', () => {
            document.getElementById('add-device-modal').remove();
        });
    }
}