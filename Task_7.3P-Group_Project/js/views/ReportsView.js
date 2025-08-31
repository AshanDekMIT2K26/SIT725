class ReportsView {
    constructor() {
        this.reportChart = null;
    }
    
    updateReportChart(labels, data) {
        if (window.myEMSApp && window.myEMSApp.reportChart) {
            window.myEMSApp.reportChart.data.labels = labels;
            window.myEMSApp.reportChart.data.datasets[0].data = data;
            window.myEMSApp.reportChart.update();
        }
    }
    
    showReport(report) {
        // Extract labels and data from report
        const labels = report.data.map(item => {
            if (report.type === 'daily') {
                return new Date(item.timestamp).toLocaleTimeString();
            } else {
                return new Date(item.timestamp).toLocaleDateString();
            }
        });
        
        const data = report.data.map(item => item.consumption);
        
        this.updateReportChart(labels, data);
    }
}