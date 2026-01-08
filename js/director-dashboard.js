/**
 * director-dashboard.js - Dashboard chart initialization
 */

let revenueChartInstance = null;

// eslint-disable-next-line no-unused-vars
function initChart() {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) return;

  // Prevent creating multiple charts on same canvas
  if (revenueChartInstance) revenueChartInstance.destroy();

  const chartCtx = ctx.getContext('2d');
  const gradient = chartCtx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(99, 255, 28, 0.4)'); // Lime
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  // eslint-disable-next-line no-undef
  revenueChartInstance = new Chart(chartCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'Revenue',
          data: [300, 450, 400, 600, 550, 700, 850, 900],
          borderColor: '#63ff1c',
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
        },
        {
          label: 'Procurement Cost',
          data: [200, 300, 250, 400, 350, 500, 600, 650],
          borderColor: '#cbd5e1',
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { display: false },
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
    },
  });
}
