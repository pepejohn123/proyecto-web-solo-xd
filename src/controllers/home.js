const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'home.html'));
    console.log("Hubo un get a localhost (home)");
});

module.exports = router;