const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path'); // Missing path module

const fs = require('fs');


const authMiddleware = require('../src/middlewares/auth');
const permitMiddleware = require('../src/middlewares/permit_auth');
const publicMiddleware = require('../src/middlewares/public_auth');


//const usersController = require('../src/controllers/users');

const loginController = require('../src/controllers/login')
const registerController = require('../src/controllers/register')
const documentController = require('../src/controllers/document')
const homeController = require('../src/controllers/home')
const permitController = require('../src/controllers/permit')
const profileController = require('../src/controllers/profile')
const userController = require('../src/controllers/user')

router.use(express.json());
router.use(cookieParser());
router.use('/uploads', express.static('uploads'));
router.use('/scans', publicMiddleware, express.static('scans'));
//router.use('/scans',authMiddleware,express.static('scans'));

const uploadMiddlewarePP = require('../src/middlewares/uploadPP.js');
const uploadMiddlewareScan = require('../src/middlewares/uploadScan.js');

//AUTH
router.post('/login', loginController.login);

//Users

router.post('/register', registerController.register);


router.use(authMiddleware);
router.get('/credentials', documentController.ver);
router.get('/user/:id', userController.verPorId);
router.get('/credentials/:name', documentController.porNombre);
router.post('/credentials', documentController.insertar);
router.put('/credentials', documentController.actualizar);
router.delete('/credentials', documentController.borrar);
router.get('/permits/:id', permitController.porDocumento);
router.post('/permits', permitController.insertar);
router.put('/permits', permitController.add);
router.delete('/permits', permitController.borrar);
router.get('/profile', profileController.public);
router.put('/profile', profileController.editar);
router.get('/profile/mine', profileController.lookByID);

router.get('/profile/:parameter', profileController.public);

router.post('/upload', uploadMiddlewarePP.single('archivo'), (req, res) => {
  console.log('File:', req.file);
  if (req.file) {
    res.send('OK!');
  } else {
    res.status(400).send('Invalid format');
  }
});

router.delete('/newDocument', (req, res) => {
  const filename = req.body.name;
  const ext = req.body.ext;
  const filePath = `scans/${filename}.${ext}`;

  console.log('File:', filePath);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err}`);
      res.status(500).json({ error: 'Error deleting file' });
    } else {
      console.log(`File deleted: ${filename}`);
      res.json({ message: 'File deleted successfully' });
    }
  });
});

router.post('/newDocument', uploadMiddlewareScan.single('scan'), (req, res) => {
  console.log('File:', req.body.name);
  if (req.file) {
    //append(name)
    res.send('OK!');
  } else {
    res.status(400).send('Invalid format');
  }
});

router.get('/:page', homeController);


router.use((req, res) => {
  console.log("SIIIII ENTRÓ");
  res.status(404).sendFile(path.join(__dirname, '../public', '404.html'));
});

module.exports = router; /* se pone al final pa que esté todo definido cuando se llame */