const express = require('express');
const path = require('path');

const router = express.Router();

// Helper function to validate valid HTML pages
function isValidPage(pageName) {
  const allowedPages = ['home', 'newDocument', 'checkDocuments', 'allDocuments', 'managePermits', 'seeProfiles']; // Add more pages as needed
  return allowedPages.includes(pageName);
}

router.get('/:page', (req, res) => {
  const pageName = req.params.page;

  // Check if the requested HTML file exists
  if (isValidPage(pageName)) {
    const filePath = path.join(__dirname, '../../public', `${pageName}.html`);
    res.sendFile(filePath);
    console.log(`Hubo un GET a localhost (${pageName})`);
  } else {
    res.status(404).sendFile(path.join(__dirname, '../../public', '404.html'));
  }
});

// Error handling for not authorized routes
router.use((err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).sendFile(path.join(__dirname, '../../public', '401.html'));
  } else {
    next(err);
  }
});


module.exports = router;
