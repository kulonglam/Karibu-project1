// DOM Element References
const views = {
  login: document.getElementById('login-view'),
  app: document.getElementById('app-wrapper'),
  allSections: document.querySelectorAll('.view-section'),
  sidebarNav: document.getElementById('sidebar-nav'),
};

// Mock User Data
const ROLES = {
  DIRECTOR: {
    name: 'Orban',
    role: 'Director',
    startView: 'view-director-dash',
    links: [
      { icon: 'bi-grid-1x2', text: 'Dashboard', target: 'view-director-dash' },
      { icon: 'bi-box-seam', text: 'Stock', target: 'view-agent-home' }, // Shared view
      { icon: 'bi-gear', text: 'Settings', target: '#' },
    ],
  },
  AGENT: {
    name: 'Alex Morgan',
    role: 'Sales Agent',
    startView: 'view-agent-home',
    links: [
      { icon: 'bi-house-door', text: 'Overview', target: 'view-agent-home' },
      { icon: 'bi-cart-check', text: 'Cash Sale', target: 'view-cash-sale' },
      {
        icon: 'bi-credit-card',
        text: 'Credit Sale',
        target: 'view-credit-sale',
      },
    ],
  },
};

// === 1. NAVIGATION LOGIC ===

function navigateTo(targetId) {
  // Hide all views
  views.allSections.forEach((section) => section.classList.add('d-none'));

  // Show target view
  const target = document.getElementById(targetId);
  if (target) {
    target.classList.remove('d-none');

    // Render chart if dashboard is opened
    if (targetId === 'view-director-dash') initChart();
  }

  // Update Sidebar Active State
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('onclick').includes(targetId)) {
      link.classList.add('active');
    }
  });
}

function buildSidebar(roleData) {
  views.sidebarNav.innerHTML = ''; // Clear existing
  roleData.links.forEach((link) => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = `
            <a href="#" class="nav-link" onclick="navigateTo('${link.target}')">
                <i class="bi ${link.icon} me-3"></i>${link.text}
            </a>
        `;
    views.sidebarNav.appendChild(li);
  });
}

// === 2. LOGIN LOGIC ===

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value.toLowerCase();

  let userRole = null;

  if (username.includes('director')) {
    userRole = ROLES.DIRECTOR;
  } else {
    userRole = ROLES.AGENT;
  }

  // Update User Profile in Sidebar
  document.getElementById('user-name').textContent = userRole.name;
  document.getElementById('user-role').textContent = userRole.role;

  // Build Sidebar & Switch View
  buildSidebar(userRole);
  views.login.classList.add('d-none'); // Hide login
  views.app.classList.remove('d-none'); // Show app
  navigateTo(userRole.startView);
});

// Declaration of variables

const cashQty = document.getElementById('cashQty');
const cashPrice = document.getElementById('cashPrice');
const cashPaid = document.getElementById('cashPaid');
const lineTotalEl = document.getElementById('cashLineTotal');
const totalDueEl = document.getElementById('cashTotalDue');
const changeEl = document.getElementById('cashChange');

function calculateSales() {
  const qty = parseFloat(cashQty.value) || 0;
  const price = parseFloat(cashPrice.value) || 0;
  const total = qty * price;

  lineTotalEl.textContent = total.toLocaleString();
  totalDueEl.textContent = `UgX ${total.toLocaleString()}`;

  const paid = parseFloat(cashPaid.value) || 0;
  const change = paid - total;

  if (paid > 0) {
    changeEl.textContent = `${change > 0 ? change.toLocaleString() : 0} UgX`;
    changeEl.className = change >= 0 ? 'text-success' : 'text-danger';
  } else {
    changeEl.textContent = '0 UgX';
    changeEl.className = 'text-danger';
  }
}

// Attach listeners
if (cashQty) {
  [cashQty, cashPrice, cashPaid].forEach((input) => {
    input.addEventListener('input', calculateSales);
  });
}

//  CHART.JS (Director Dashboard)

let revenueChartInstance = null;

function initChart() {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) return;

  // Prevent creating multiple charts on same canvas
  if (revenueChartInstance) revenueChartInstance.destroy();

  const chartCtx = ctx.getContext('2d');
  const gradient = chartCtx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(99, 255, 28, 0.4)'); 
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  // eslint-disable-next-line no-undef
  revenueChartInstance = new chart(chartCtx, {
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
function logout() {
  window.location.reload();
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
