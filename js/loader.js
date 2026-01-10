/**
 * loader.js - Dynamically loads partial HTML files
 * Fetches and injects all partial HTML files into their respective DOM containers
 * Executes after DOM is loaded to populate the app with UI components
 */

// Asynchronously load all partial HTML files into the DOM
async function loadPartials() {
  // Configuration: maps container IDs to partial file paths
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

  // Load each partial with error handling
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
        // Inject HTML into the corresponding container
        container.innerHTML = html;
      }
    } catch (error) {
      console.error(`Error loading ${partial.file}:`, error);
    }
  }

  // Re-initialize form handlers after partials are loaded into DOM
  initializeFormHandlers();
}

function initializeFormHandlers() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    // Attach login form submission handler (defined in login.js)
    // eslint-disable-next-line no-undef
    loginForm.addEventListener('submit', handleLogin);
  }
}

// Load partials when DOM is ready
document.addEventListener('DOMContentLoaded', loadPartials);
