const express = require('express');
const router = express.Router();
const { readJSON, writeJSON } = require('../utils/jsonHelper');
const upload = require('../utils/uploadHelper');

// Get all content
router.get('/content', async (req, res) => {
  try {
    const content = await readJSON('content.json');
    res.json(content);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to read content' });
  }
});

// Update specific section in content.json
router.put('/content/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const updateData = req.body;
    const content = await readJSON('content.json');
    
    if (!content[section]) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    content[section] = { ...content[section], ...updateData };
    await writeJSON('content.json', content);
    
    res.json({ success: true, message: `${section} updated successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update content' });
  }
});

// Get settings (excluding admin credentials)
router.get('/settings', async (req, res) => {
  try {
    const settings = await readJSON('setting.json');
    res.json(settings.website);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to read settings' });
  }
});

// Update website settings
router.put('/settings', async (req, res) => {
  try {
    const updateData = req.body;
    const settings = await readJSON('setting.json');
    
    settings.website = { ...settings.website, ...updateData };
    await writeJSON('setting.json', settings);
    
    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
});

// Image Upload Endpoint
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded or invalid file type' });
  }

  // Cleanup old files with the same base name but different extensions
  const fs = require('fs');
  const path = require('path');
  const PUBLIC_ASSETS_DIR = path.join(__dirname, '../../public/assets');
  
  const uploadedExt = path.extname(req.file.filename);
  const baseName = path.basename(req.file.filename, uploadedExt);

  fs.readdir(PUBLIC_ASSETS_DIR, (err, files) => {
    if (!err) {
      files.forEach(file => {
        if (file.startsWith(baseName + '.') && file !== req.file.filename) {
          fs.unlink(path.join(PUBLIC_ASSETS_DIR, file), err => {
            if (err) console.error('Failed to delete old asset:', file);
          });
        }
      });
    }
  });

  res.json({ success: true, message: 'Image uploaded successfully', filename: req.file.filename });
});

module.exports = router;
