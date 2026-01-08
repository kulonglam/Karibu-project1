/**
 * script.js - Core application logic
 * Handles navigation, authentication, and app initialization
 */

// Mock User Data (Global)
window.ROLES = {
  DIRECTOR: {
    name: 'Orban',
    role: 'Director',
    startView: 'view-director-dash',
    links: [
      { icon: 'bi-graph-up', text: 'Analytics', target: 'view-director-dash' },
    ],
  },
  AGENT: {
    name: 'Kulong Lam',
    role: 'Sales Agent',
    startView: 'view-agent-home',
    links: [
      { icon: 'bi-cart-check', text: 'Cash Sale', target: 'view-cash-sale' },
      {
        icon: 'bi-credit-card',
        text: 'Credit Sale',
        target: 'view-credit-sale',
      },
    ],
  },
  MANAGER: {
    name: 'Manager',
    role: 'Store Manager',
    startView: 'view-cash-sale',
    links: [
      { icon: 'bi-house-door', text: 'Overview', target: 'view-agent-home' },
      { icon: 'bi-cart-check', text: 'Cash Sale', target: 'view-cash-sale' },
      {
        icon: 'bi-credit-card',
        text: 'Credit Sale',
        target: 'view-credit-sale',
      },
      { icon: 'bi-truck', text: 'Procurement', target: 'view-procurement' },
      { icon: 'bi-person', text: 'Suppliers', target: 'view-suppliers' },
      { icon: 'bi-graph-up', text: 'Analytics', target: 'view-director-dash' },
    ],
  },
};

// navigation login based on role

// eslint-disable-next-line no-unused-vars
function navigateTo(targetId) {
  // Hide all views
  const allSections = document.querySelectorAll('.view-section');
  allSections.forEach((section) => section.classList.add('d-none'));

  // Show target view
  const target = document.getElementById(targetId);
  if (target) {
    target.classList.remove('d-none');

    // Render chart if dashboard is opened
    if (targetId === 'view-director-dash') {
      // eslint-disable-next-line no-undef
      if (typeof initChart === 'function') initChart();
    }
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

// Logout functionality
function logout() {
  window.location.reload();
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
