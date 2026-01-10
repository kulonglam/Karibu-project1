/**
 * login.js - Handle login form submission and password visibility
 * Authenticates users based on username and assigns appropriate role
 */

// Toggle password visibility between plain text and masked
// eslint-disable-next-line no-unused-vars
function togglePasswordVisibility() {
  const passwordField = document.getElementById('password');
  const passwordIcon = document.getElementById('passwordIcon');

  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    passwordIcon.classList.remove('bi-eye');
    passwordIcon.classList.add('bi-eye-slash');
  } else {
    passwordField.type = 'password';
    passwordIcon.classList.remove('bi-eye-slash');
    passwordIcon.classList.add('bi-eye');
  }
}

// Handle login form submission - routes users based on username role
// eslint-disable-next-line no-unused-vars
function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.toLowerCase();

  // Determine user role based on username keywords
  let userRole = null;

  if (username.includes('director')) {
    userRole = window.ROLES.DIRECTOR;
  } else if (username.includes('manager')) {
    userRole = window.ROLES.MANAGER;
  } else {
    userRole = window.ROLES.AGENT;
  }

  // Update sidebar user profile section with role information
  document.getElementById('user-name').textContent = userRole.name;
  document.getElementById('user-role').textContent = userRole.role;

  // Build dynamic sidebar and show main application
  window.buildSidebar(userRole);
  const loginView = document.getElementById('login-view');
  const appWrapper = document.getElementById('app-wrapper');
  if (loginView) loginView.classList.add('d-none');
  if (appWrapper) appWrapper.classList.remove('d-none');

  // Navigate to role's default view
  window.navigateTo(userRole.startView);
}
