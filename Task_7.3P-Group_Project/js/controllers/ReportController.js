class ReportController {
    constructor() {
        this.view = new ReportsView();
    }
    
    generateReport(type) {
        // Simulate API call to generate report
        setTimeout(() => {
            const reportData = this.generateReportData(type);
            const report = new Report({
                type: type,
                data: reportData,
                period: new Date().toISOString().split('T')[0]
            });
            
            report.calculateTotals();
            this.view.showReport(report);
        }, 1000);
    }
    
    generateReportData(type) {
        const data = [];
        const now = new Date();
        let points = 0;
        
        switch (type) {
            case 'daily':
                points = 24;
                break;
            case 'weekly':
                points = 7;
                break;
            case 'monthly':
                points = 30;
                break;
            case 'yearly':
                points = 12;
                break;
        }
        
        for (let i = 0; i < points; i++) {
            let timestamp;
            
            if (type === 'daily') {
                timestamp = new Date(now);
                timestamp.setHours(now.getHours() - points + 1 + i);
            } else if (type === 'weekly') {
                timestamp = new Date(now);
                timestamp.setDate(now.getDate() - points + 1 + i);
            } else if (type === 'monthly') {
                timestamp = new Date(now);
                timestamp.setDate(now.getDate() - points + 1 + i);
            } else if (type === 'yearly') {
                timestamp = new Date(now);
                timestamp.setMonth(now.getMonth() - points + 1 + i);
            }
            
            data.push({
                timestamp: timestamp.toISOString(),
                consumption: Math.random() * 20 + 10, // Random between 10-30 kWh
                cost: (Math.random() * 20 + 10) * 0.12 // Random cost based on consumption
            });
        }
        
        return data;
    }
}