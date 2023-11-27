const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');


const uploadMiddlewarePP = require('../src/middlewares/uploadPP.js');
const uploadMiddlewareScan = require('../src/middlewares/uploadScan.js');


const authMiddleware = require('../src/middlewares/auth');

//const usersController = require('../src/controllers/users');

const loginController = require('../src/controllers/login')
const registerController = require('../src/controllers/register')
const documentController = require('../src/controllers/document')
const homeController = require('../src/controllers/home')
const permitController = require('../src/controllers/permit')

router.use(express.json());
router.use(cookieParser());
//AUTH
router.post('/login', loginController.login);

//Users

router.post('/register', registerController.register);

router.use(authMiddleware);
router.get('/credentials', documentController.ver);
router.post('/credentials', documentController.insertar);
router.post('/permits', permitController.insertar);
router.get('/:page', homeController);


router.post('/upload', uploadMiddlewarePP.single('archivo'), (req, res) => {
    console.log('File:', req.file);
    if (req.file) {
      res.send('OK!');
    } else {
      res.status(400).send('Invalid format');
    }
  });

  router.post('/newDocument', uploadMiddlewareScan.single('scan'), (req, res) => {
    console.log('File:', req.body.name);
    if (req.file) {
      res.send('OK!');
    } else {
      res.status(400).send('Invalid format');
    }
  });

module.exports = router; /* se pone al final pa que esté todo definido cuando se llame */