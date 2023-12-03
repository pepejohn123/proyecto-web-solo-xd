const { log } = require('console');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Permit = require('./../models/permit');

const secretKey = process.env.SECRET_KEY;

const publicMiddleware = (req, res, next) => {
    const parts = req.url.split('/');

    // Take the first part and split it by "."
    const filenameParts = parts[1].split('.');

    // Remove everything after the first element of the filenameParts array
    const result = filenameParts.slice(0, 1).join('.');
    console.log('id: ' + result);
    Permit.findOne({ document: result })
        .then(permisop => {
            if (permisop) {
                if (permisop.public == true) {
                    console.log("aaa");
                    next();
                }
                else {
                    console.log("ooo");
                    const token = req.cookies.jwtToken;
                    //console.log(token);
                    jwt.verify(token, secretKey, (err, decode) => {
                        if (err) {
                            res.status(401).send({ msg: 'No estás logeado' })
                        }
                        else {
                            req.user = decode; //modificar la información encriptada, se la pasas desencriptada (por referencia)
                            console.log(req.user);
                            const user = req.user;
                            var email = user.email;
                            const owner_check = permisop.owner == req.user._id;
                            const permitted_check = permisop.permitted_users.includes(email);
                            if (owner_check || permitted_check) {
                                next();
                            }
                            //res.send({ _id, email });
                            else {
                                res.sendStatus(400);
                            }
                        }
                    })
                }

            }
            else {
                res.sendStatus(404);
            }
        })
        .catch(err => {
            console.log('permit error:', err);
            res.sendStatus(400);
        })


};

module.exports = publicMiddleware;