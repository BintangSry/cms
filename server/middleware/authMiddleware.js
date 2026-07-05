const requireAuth = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  
  // If it's an API request, return 401 JSON
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Otherwise redirect to login
  res.redirect('/admin/login.html');
};

module.exports = {
  requireAuth
};
