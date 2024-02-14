document.addEventListener('DOMContentLoaded', () => {
    // Get network traffic data
    fetch('/api/network-traffic')
        .then(response => response.json())
        .then(data => {
            const networkChart = document.getElementById('networkChart');
            drawNetworkChart(networkChart, data.data);
        });
});

function drawNetworkChart(canvas, data) {
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{
                label: 'Network Traffic',
                data: data,
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                pointRadius: 5,
                pointBorderWidth: 2,
                pointBorderColor: 'rgba(255, 255, 255, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
