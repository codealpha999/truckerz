const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
window.location.href = 'index 2.html';

const app = express();
const PORT = 3000;




// In-memory user data (no database)
const users = {
  admin: 'password123',  // Example user: admin/password123
};

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your-secret-key',  // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
  })
);

// Serve static files (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Render login form
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login logic
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username] === password) {
    req.session.user = username;  // Store username in session
    return res.redirect('/success');
  }
  res.send('Invalid username or password. <a href="/login">Try again</a>');
});

// Display success page if logged in
app.get('/success', (req, res) => {
  if (req.session.user) {
    res.send('<h1>Login Success</h1><p>Welcome to Truckerz!</p><a href="/logout">Logout</a>');
  } else {
    res.redirect('/login');  // Redirect to login if not authenticated
  }
});

// Handle logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send('Error logging out.');
    res.redirect('/login');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

