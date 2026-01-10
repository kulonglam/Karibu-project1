// Store chart instance globally to prevent canvas reuse errors
let revenueChartInstance = null;

// Initializes or refreshes the Revenue vs. Procurement Cost chart.
function initDirectorChart() {
  const canvas = document.getElementById('revenueChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Destroy existing instance before re-initializing
  if (revenueChartInstance) {
    revenueChartInstance.destroy();
  }

  // Create smooth gradient for Revenue line
  const revenueGradient = ctx.createLinearGradient(0, 0, 0, 300);
  revenueGradient.addColorStop(0, 'rgba(124, 255, 26, 0.25)');
  revenueGradient.addColorStop(1, 'rgba(124, 255, 26, 0)');

  // Configuration: Build the Chart.js instance
  // eslint-disable-next-line no-undef
  revenueChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'Revenue',
          data: [450, 400, 580, 500, 750, 680, 920, 880],
          borderColor: '#7CFF1A',
          backgroundColor: revenueGradient,
          fill: true,
          tension: 0.4, // Match design curves
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#7CFF1A',
          borderWidth: 3,
        },
        {
          label: 'Procurement Cost',
          data: [320, 300, 450, 410, 550, 510, 680, 620],
          borderColor: '#E2E8F0',
          backgroundColor: 'transparent',
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 3,
          // Visual distinction from revenue line
          borderDash: [5, 5],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1a1a',
          titleFont: { size: 13 },
          bodyFont: { size: 12 },
          padding: 10,
          callbacks: {
            // Format labels with UGX currency
            label: (context) => {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              if (context.parsed.y !== null) {
                label += `UGX ${context.parsed.y}M`;
              }
              return label;
            },
            // Dynamic Profit Calculation: Revenue - Cost
            afterBody: (context) => {
              const dataIndex = context[0].dataIndex;
              const revenue = context[0].chart.data.datasets[0].data[dataIndex];
              const cost = context[0].chart.data.datasets[1].data[dataIndex];
              const profit = revenue - cost;
              return `\nEstimated Profit: UGX ${profit}M`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#F8FAFC' },
          ticks: {
            font: { size: 10 },
            callback: (value) => `UGX ${value}M`,
          },
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 10 } },
        },
      },
    },
  });
}

// 4. Initialization: Run on initial load
document.addEventListener('DOMContentLoaded', initDirectorChart);
