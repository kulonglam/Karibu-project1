/**
 * sidebar.js - Sidebar navigation logic
 * Dynamically builds the sidebar navigation based on user role at runtime
 */

// Build sidebar navigation items from role data
// eslint-disable-next-line no-unused-vars
function buildSidebar(roleData) {
  const sidebarNav = document.getElementById('sidebar-nav');
  if (!sidebarNav) return;

  sidebarNav.innerHTML = ''; // Clear existing items

  // Create navigation link for each feature available to this role
  roleData.links.forEach((link) => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    // Each link: icon + text, click navigates to the view
    li.innerHTML = `
      <a href="#" class="nav-link" onclick="navigateTo('${link.target}')">
        <i class="bi ${link.icon} me-3"></i>${link.text}
      </a>
    `;
    sidebarNav.appendChild(li);
  });
}
