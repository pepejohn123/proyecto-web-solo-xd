const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const cookieParser = require('cookie-parser');

class LoginController{
    login(req,res){
        const {email, password} = req.body;
        console.log(req.body);
        
        User.findOne({email, password})
            .then(response=>{
                console.log(response);
                if(response){
                    const {_id, email} = response;
                    const token=jwt.sign({_id,email}, process.env.SECRET_KEY)
                    console.log(token);
                    res.cookie('jwtToken', token, { httpOnly: true });

                    res.send({_id,email});
                }
                else{
                    res.sendStatus(400);
                }
            })
            .catch(err=>{
                console.log('Login error:', err);
                res.sendStatus(400);
            })
    }
}

module.exports = new LoginController();