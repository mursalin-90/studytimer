function loadUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function registerUser(username, email, password) {
    const users = loadUsers();
    if (users.find(u => u.email === email)) {
        alert('Email already exists!');
        return false;
    }

    users.push({
        username,
        email,
        password,
        history: []
    });

    saveUsers(users);
    return true;
}

function login(email, password) {
    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
}

// Handle Register Form
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (registerUser(username, email, password)) {
            alert('Registration successful!');
            window.location.href = 'login.html';
        }
    });
}

// Handle Login Form
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (login(email, password)) {
            window.location.href = 'index.html';
        } else {
            alert('Invalid credentials!');
        }
    });
}
