/**
 * loader.js - Dynamically loads partial HTML files
 * This file loads all HTML partials into their respective containers
 */

async function loadPartials() {
  const partials = [
    { container: '#login-container', file: 'partials/login.html' },
    { container: '#sidebar-container', file: 'partials/sidebar.html' },
    {
      container: '#director-dashboard-container',
      file: 'partials/director-dashboard.html',
    },
    { container: '#agent-home-container', file: 'partials/agent-home.html' },
    { container: '#cash-sale-container', file: 'partials/cash-sale.html' },
    { container: '#credit-sale-container', file: 'partials/credit-sale.html' },
    { container: '#procurement-container', file: 'partials/procurement.html' },
    { container: '#suppliers-container', file: 'partials/suppliers.html' },
  ];

  for (const partial of partials) {
    try {
      const response = await fetch(partial.file);
      if (!response.ok) {
        console.error(`Failed to load ${partial.file}: ${response.statusText}`);
        continue;
      }
      const html = await response.text();
      const container = document.querySelector(partial.container);
      if (container) {
        container.innerHTML = html;
      }
    } catch (error) {
      console.error(`Error loading ${partial.file}:`, error);
    }
  }

  // Re-initialize form handlers after partials are loaded
  initializeFormHandlers();
}

function initializeFormHandlers() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    // handleLogin is defined in login.js (loaded via script tag)
    // eslint-disable-next-line no-undef
    loginForm.addEventListener('submit', handleLogin);
  }
}

// Load partials when DOM is ready
document.addEventListener('DOMContentLoaded', loadPartials);
