// auth.js

// Simulate an in-memory user database
let users = [];

function registerUser(email, password) {
    if (users.find(user => user.email === email)) {
        alert('Email is already registered');
    } else {
        users.push({ email, password });
        alert('Account created successfully');
        document.getElementById('login-page').style.display = 'block';
        document.getElementById('signup-page').style.display = 'none';
    }
}

function loginUser(email, password) {
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('Login successful');
        document.getElementById('task-manager').style.display = 'block';
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('signup-page').style.display = 'none';
    } else {
        alert('Invalid email or password');
    }
}
