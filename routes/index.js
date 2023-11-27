const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads');
    },
    filename: (req,file,cb) => {
        const id = req.user._id
        console.log(id);
        const ts = id;
        const ext = file.originalname.split('.').pop()
        const name= `${ts}.${ext}`;
        cb(null, name);

    }

})
const fileFilter = (req, file, cb)=>{
    const isValid = file.mimetype.startsWith('image/');
    cb(null,isValid);
}

const uploadMiddleware = multer({storage: storage, fileFilter: fileFilter});



const authMiddleware = require('../src/middlewares/auth');

//const usersController = require('../src/controllers/users');

const loginController = require('../src/controllers/login')
const registerController = require('../src/controllers/register')
const documentController = require('../src/controllers/document')
const homeController = require('../src/controllers/home')
router.use(express.json());
router.use(cookieParser());
//AUTH
router.post('/login',loginController.login);

//Users

router.post('/register',registerController.register);

router.use(authMiddleware);
router.get('/credentials',documentController.ver);
router.post('/credentials',documentController.insertar);
router.get('/:page', homeController);


router.post('/upload',uploadMiddleware.single('archivo'),(req,res)=>{
    console.log('File:',req.file);
    if(req.file){
        res.send('OK!');
    }
    else{
        res.status(400).send('invalid format')
    }
});

module.exports = router; /* se pone al final pa que esté todo definido cuando se llame */