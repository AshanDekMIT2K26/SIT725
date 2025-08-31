class Report {
    constructor(data) {
        this.id = data.id || Date.now().toString();
        this.type = data.type || 'daily'; // daily, weekly, monthly, yearly
        this.period = data.period || new Date().toISOString().split('T')[0];
        this.data = data.data || [];
        this.totalConsumption = data.totalConsumption || 0;
        this.totalCost = data.totalCost || 0;
        this.generatedAt = data.generatedAt || new Date();
    }
    
    // Calculate totals from data
    calculateTotals() {
        this.totalConsumption = this.data.reduce((sum, item) => sum + item.consumption, 0);
        this.totalCost = this.data.reduce((sum, item) => sum + item.cost, 0);
        return { consumption: this.totalConsumption, cost: this.totalCost };
    }
    
    // Convert to JSON for storage
    toJSON() {
        return {
            id: this.id,
            type: this.type,
            period: this.period,
            data: this.data,
            totalConsumption: this.totalConsumption,
            totalCost: this.totalCost,
            generatedAt: this.generatedAt
        };
    }
}