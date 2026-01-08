/**
 * sidebar.js - Sidebar navigation logic
 */

// eslint-disable-next-line no-unused-vars
function buildSidebar(roleData) {
  const sidebarNav = document.getElementById('sidebar-nav');
  if (!sidebarNav) return;

  sidebarNav.innerHTML = ''; // Clear existing
  roleData.links.forEach((link) => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = `
      <a href="#" class="nav-link" onclick="navigateTo('${link.target}')">
        <i class="bi ${link.icon} me-3"></i>${link.text}
      </a>
    `;
    sidebarNav.appendChild(li);
  });
}
