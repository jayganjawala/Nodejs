const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get('/set', (req, res) => {
  res.cookie('user', 'Jay Ganjawala', { maxAge: 900000, httpOnly: true });
  req.session.username = 'Jay Ganjawala';
  req.session.visits = (req.session.visits || 0) + 1;
  res.send('Cookie and session data have been set.');
});

app.get('/get', (req, res) => {
  const userCookie = req.cookies.user;
  const username = req.session.username;
  const visits = req.session.visits;

  if (username) {
    res.send(`Hello ${username}! You have visited this page ${visits} times.`);
  } else {
    res.send('No session data found. Please visit the /set route first.');
  }
});

app.get('/clear', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error clearing session.');
    }
    res.clearCookie('user');
    res.send('Session and cookie cleared.');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
