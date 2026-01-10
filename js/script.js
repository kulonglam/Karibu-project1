/**
 * script.js - Core application logic and routing
 * Handles navigation between views, authentication, and form validation
 */

// User roles configuration with names, default views, and available features
// NOTE: This is mock data - replace with actual backend authentication
window.ROLES = {
  DIRECTOR: {
    name: 'Orban',
    role: 'Director',
    startView: 'view-director-dash',
    // Director only sees analytics
    links: [
      { icon: 'bi-graph-up', text: 'Analytics', target: 'view-director-dash' },
    ],
  },
  AGENT: {
    name: 'Kulong',
    role: 'Sales Agent',
    startView: 'view-agent-home',
    // Agent can view home, record cash/credit sales, and check inventory
    links: [
      { icon: 'bi-house-door', text: 'Home', target: 'view-agent-home' },
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
    // Manager has access to all features including procurement and suppliers
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
    ],
  },
};

// Navigate to a specific view and update active state
// eslint-disable-next-line no-unused-vars
function navigateTo(targetId) {
  // Hide all view sections
  const allSections = document.querySelectorAll('.view-section');
  allSections.forEach((section) => section.classList.add('d-none'));

  // Show the target view
  const target = document.getElementById(targetId);
  if (target) {
    target.classList.remove('d-none');

    // Initialize charts if navigating to dashboard
    if (targetId === 'view-director-dash') {
      // eslint-disable-next-line no-undef
      if (typeof initChart === 'function') initChart();
    }
  }

  // Update active link in sidebar navigation
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('onclick').includes(targetId)) {
      link.classList.add('active');
    }
  });
}

// Handle user logout - reload page to reset session
function logout() {
  window.location.reload();
}

// Attach logout button click handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

/* Form validation: attach to forms with class 'needs-validation' */
(function () {
  // Display error message below form input
  function showError(input, msg) {
    if (!input) return;
    input.classList.add('is-invalid');
    let err = input.nextElementSibling;
    if (!err || !err.classList.contains('form-error')) {
      err = document.createElement('div');
      err.className = 'form-error';
      input.parentNode.insertBefore(err, input.nextSibling);
    }
    err.textContent = msg;
  }

  function clearError(input) {
    if (!input) return;
    input.classList.remove('is-invalid');
    let err = input.nextElementSibling;
    if (err && err.classList.contains('form-error')) err.textContent = '';
  }

  function validateField(input) {
    if (!input) return true;
    const val = (input.value || '').trim();
    const type = (input.getAttribute('type') || '').toLowerCase();

    if (input.hasAttribute('required')) {
      if (val === '') {
        showError(input, 'This field is required');
        return false;
      }
    }

    if (type === 'email' && val) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(val)) {
        showError(input, 'Enter a valid email address');
        return false;
      }
    }

    if (type === 'number' && val) {
      if (isNaN(Number(val))) {
        showError(input, 'Enter a valid number');
        return false;
      }
    }

    if (input.getAttribute('pattern')) {
      const p = new RegExp(input.getAttribute('pattern'));
      if (val && !p.test(val)) {
        showError(input, 'Invalid format');
        return false;
      }
    }

    clearError(input);
    return true;
  }

  function attachForm(form) {
    if (!form) return;
    form.addEventListener('submit', function (e) {
      const inputs = Array.from(form.querySelectorAll('input,textarea,select'));
      let ok = true;
      inputs.forEach((i) => {
        if (!validateField(i)) ok = false;
      });
      if (!ok) {
        e.preventDefault();
        e.stopPropagation();
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
      }
    });

    form.addEventListener('input', function (e) {
      if (e.target) clearError(e.target);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('form.needs-validation').forEach(attachForm);
  });
})();
