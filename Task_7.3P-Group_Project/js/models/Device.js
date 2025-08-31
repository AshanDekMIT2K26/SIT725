class Device {
    constructor(data) {
        this.id = data.id || Date.now().toString();
        this.name = data.name || '';
        this.type = data.type || '';
        this.powerRating = data.powerRating || 0; // in watts
        this.energyConsumption = data.energyConsumption || 0; // in kWh
        this.status = data.status || 'inactive';
        this.lastActive = data.lastActive || null;
        this.location = data.location || '';
    }
    
    // Calculate energy cost based on rate
    calculateCost(rate = 0.12) {
        return this.energyConsumption * rate;
    }
    
    // Convert to JSON for storage
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            powerRating: this.powerRating,
            energyConsumption: this.energyConsumption,
            status: this.status,
            lastActive: this.lastActive,
            location: this.location
        };
    }
}