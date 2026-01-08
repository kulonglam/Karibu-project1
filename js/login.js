/**
 * login.js - Handle login form submission
 */

// eslint-disable-next-line no-unused-vars
function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.toLowerCase();

  let userRole = null;

  if (username.includes('director')) {
    userRole = window.ROLES.DIRECTOR;
  } else if (username.includes('manager')) {
    userRole = window.ROLES.MANAGER;
  } else {
    userRole = window.ROLES.AGENT;
  }

  // Update User Profile in Sidebar
  document.getElementById('user-name').textContent = userRole.name;
  document.getElementById('user-role').textContent = userRole.role;

  // Build Sidebar & Switch View
  window.buildSidebar(userRole);
  const loginView = document.getElementById('login-view');
  const appWrapper = document.getElementById('app-wrapper');
  if (loginView) loginView.classList.add('d-none');
  if (appWrapper) appWrapper.classList.remove('d-none');
  window.navigateTo(userRole.startView);
}
