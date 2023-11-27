const User = require('./../models/user');

class RegisterController{
    register(req,res){
        const userData = req.body;
        console.log(req.body);
        User.create(userData)
            .then(response=>{
                console.log(response);
                if(response){
                    console.log('User created:', response);
                    res.send(response);
                }
                else{
                    res.sendStatus(400);
                }
            })
            .catch(err=>{
                console.log('Login error:', err);
            })
    }
}

module.exports = new RegisterController();