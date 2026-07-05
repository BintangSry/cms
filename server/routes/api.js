const express = require('express');
const router = express.Router();
const { readJSON } = require('../utils/jsonHelper');

// Public route to get website data for the landing page
router.get('/content', async (req, res) => {
  try {
    const content = await readJSON('content.json');
    const settings = await readJSON('setting.json');
    
    res.json({
      content,
      website: settings.website
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load content' });
  }
});

module.exports = router;
