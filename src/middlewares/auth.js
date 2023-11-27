const { log } = require('console');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req,res,next)=>{
    const token = req.cookies.jwtToken;
    //console.log(token);
    jwt.verify(token,secretKey,(err,decode)=>{
        if(err){
            res.status(401).send({msg:'No estás logeado'})
        }
        else{
            req.user = decode; //modificar la información encriptada, se la pasas desencriptada (por referencia)
            //console.log(req.user._id);
            
            next();
        }
    })
    
};

module.exports = authMiddleware;