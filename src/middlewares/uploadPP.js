const multer = require('multer');

// Custom filename function for dynamic naming
const dynamicFilename = (req, file, cb) => {
  const id = req.user._id;
  const ts = id;
  const ext = file.originalname.split('.').pop();
  const name = `${ts}.${ext}`;
  cb(null, name);
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: dynamicFilename,
});

// Multer file filter
const fileFilter = (req, file, cb) => {
  const isValid = file.mimetype.startsWith('image/');
  cb(null, isValid);
};

// Create Multer instance with custom configuration
const uploadMiddleware = multer({ storage: storage, fileFilter: fileFilter });

module.exports = uploadMiddleware;