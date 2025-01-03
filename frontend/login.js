document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // add new user accounts here
    const accounts = [
        { username: 'test', password: 'test' },
        { username: 'user', password: 'password' },
        { username: 'erhemee', password: '123456' }
    ];

    // Check if the entered credentials match any account
    const account = accounts.find(acc => acc.username === username && acc.password === password);

    if (account) {
        errorMessage.textContent = '';
        localStorage.setItem('authToken', 'your-token'); // Store token in localStorage
        window.location.href = 'dashboard.html'; // Redirect to dashboard.html
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});