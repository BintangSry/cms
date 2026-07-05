const express = require('express');
const router = express.Router();
const { readJSON } = require('../utils/jsonHelper');
const { comparePassword } = require('../utils/authHelper');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const settings = await readJSON('setting.json');
    const adminConfig = settings.admin;

    if (username === adminConfig.username) {
      const isMatch = await comparePassword(password, adminConfig.passwordHash);
      if (isMatch) {
        req.session.isAuthenticated = true;
        return res.json({ success: true, message: 'Login successful' });
      }
    }
    
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logged out' });
});

router.get('/check', (req, res) => {
  if (req.session && req.session.isAuthenticated) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
