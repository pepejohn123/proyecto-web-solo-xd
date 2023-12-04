const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const mongoose = require('mongoose');


class UserController {
    verPorId(req, res) {
        var userID = req.params.id;
        console.log(userID);
        userID = new mongoose.Types.ObjectId(userID)

        User.findById( userID )
            .then(response => {
                console.log(response);
                if (response) {
                    res.send(response.email);

                }
                else {
                    res.sendStatus(400);
                }
            })
            .catch(err => {
                console.log('Login error:', err);
                res.sendStatus(400);
            })
    }
}

module.exports = new UserController();