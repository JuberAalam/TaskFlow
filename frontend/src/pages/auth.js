// Authentication Page Logic
document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    // Toggle between login and register forms
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Handle Login
    const loginFormElement = document.getElementById('loginForm');
    loginFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await API.auth.login({ email, password });
            
            // Save authentication data
            Auth.saveAuth(response.data);
            
            Toast.success('Login successful!');
            
            // Redirect to dashboard
            setTimeout(() => {
                showDashboard();
            }, 1000);
        } catch (error) {
            Toast.error(error.message || 'Login failed');
        }
    });

    // Handle Register
    const registerFormElement = document.getElementById('registerForm');
    registerFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const role = document.getElementById('register-role').value;

        try {
            const response = await API.auth.register({ name, email, password, role });
            
            // Save authentication data
            Auth.saveAuth(response.data);
            
            Toast.success('Registration successful!');
            
            // Redirect to dashboard
            setTimeout(() => {
                showDashboard();
            }, 1000);
        } catch (error) {
            Toast.error(error.message || 'Registration failed');
        }
    });
});