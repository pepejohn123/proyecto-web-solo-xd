const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/:page', (req, res) => {
    const pageName = req.params.page;
    const filePath = path.join(__dirname, '../../public', `${pageName}.html`);

    // Check if the requested HTML file exists
    if (isValidPage(pageName)) {
        res.sendFile(filePath);
        console.log(`Hubo un GET a localhost (${pageName})`);
    } else {
        res.status(404).send('Not Found');
    }
});

// Helper function to validate valid HTML pages
function isValidPage(pageName) {
    const allowedPages = ['home', 'newDocument', 'checkDocuments','allDocuments', 'managePermits','seeProfiles']; // Add more pages as needed
    return allowedPages.includes(pageName);
}

module.exports = router;

