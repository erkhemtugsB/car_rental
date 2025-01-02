document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Simple authentication check
    if (username === 'user' && password === 'password') {
        errorMessage.textContent = '';
        localStorage.setItem('authToken', 'your-token'); // Store token in localStorage
        window.location.href = 'dashboard.html'; // Redirect to dashboard.html
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});