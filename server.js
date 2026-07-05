require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const apiRoutes = require('./server/routes/api');
const authRoutes = require('./server/routes/auth');
const adminApiRoutes = require('./server/routes/adminApi');
const { requireAuth } = require('./server/middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-for-dev',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
}));

// API Routes
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', requireAuth, adminApiRoutes);

// Static file serving - Public
app.use(express.static(path.join(__dirname, 'public')));

// Admin unauthenticated routes (login and assets)
app.use('/admin/login.html', express.static(path.join(__dirname, 'admin/login.html')));
app.use('/admin/css', express.static(path.join(__dirname, 'admin/css')));
app.use('/admin/js/auth.js', express.static(path.join(__dirname, 'admin/js/auth.js')));

// Catch-all for /admin base
app.get('/admin', (req, res) => res.redirect('/admin/dashboard.html'));

// Protected admin routes
app.use('/admin', requireAuth, express.static(path.join(__dirname, 'admin')));

// Catch-all route to serve the main landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
