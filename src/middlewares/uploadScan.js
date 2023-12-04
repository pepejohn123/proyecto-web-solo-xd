const multer = require('multer');

// Custom filename function for dynamic naming

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'scans');
    },
    filename: (req, file, cb) => {
        // Use the provided file name or generate a unique name
        const id = req.user._id;
        const name = req.body.name;
        const ext = file.originalname.split('.').pop();
        const filename = `${name}.${ext}`;
        cb(null, filename);
    },
});

// Multer file filter
const fileFilter = (req, file, cb) => {
    const isValid = file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf';
    
    cb(null, isValid);
};

// Create Multer instance with custom configuration
const uploadMiddleware = multer({ storage: storage, fileFilter: fileFilter });

module.exports = uploadMiddleware;