// Main App Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already authenticated
    if (Auth.isAuthenticated()) {
        showDashboard();
    } else {
        // Show auth section
        document.getElementById('auth-section').style.display = 'flex';
        document.getElementById('dashboard-section').style.display = 'none';
    }
});