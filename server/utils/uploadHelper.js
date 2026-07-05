const multer = require('multer');
const path = require('path');
const fs = require('fs');

const PUBLIC_ASSETS_DIR = path.join(__dirname, '../../public/assets');

// Ensure assets directory exists
if (!fs.existsSync(PUBLIC_ASSETS_DIR)) {
  fs.mkdirSync(PUBLIC_ASSETS_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PUBLIC_ASSETS_DIR);
  },
  filename: function (req, file, cb) {
    // We expect the fieldname or a body parameter to determine the filename
    // If we are replacing 'hero', the file should be named 'hero.png' or similar based on existing logic.
    // For now, we will rely on a custom filename passed in req.body.filename or use original name
    const ext = path.extname(file.originalname).toLowerCase();
    const finalName = req.body.filename ? `${req.body.filename}${ext}` : file.originalname;
    cb(null, finalName);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and WEBP are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;
