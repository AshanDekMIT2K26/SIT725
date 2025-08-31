class EnergyData {
    constructor(data) {
        this.timestamp = data.timestamp || new Date();
        this.consumption = data.consumption || 0; // in kWh
        this.cost = data.cost || 0; // in dollars
        this.deviceId = data.deviceId || null;
        this.deviceType = data.deviceType || '';
    }
    
    // Convert to JSON for storage
    toJSON() {
        return {
            timestamp: this.timestamp,
            consumption: this.consumption,
            cost: this.cost,
            deviceId: this.deviceId,
            deviceType: this.deviceType
        };
    }
}