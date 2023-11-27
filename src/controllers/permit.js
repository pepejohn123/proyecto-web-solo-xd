const Permit = require('./../models/permit');

const jwt = require('jsonwebtoken');

class PermitController {
    insertar(req, res) {
        console.log("ENTRASTE AL CONTROLLER de permisos");
        const documentData = req.body;
        documentData.owner = req.user._id;
        console.log(documentData);
        Permit.create(documentData)
            .then(response => {
                console.log(response);
                if (response) {
                    console.log('Document created:', response);
                    res.send(response);
                }
                else {
                    res.sendStatus(400);
                }
            })
            .catch(err => {
                console.log('Insert error:', err);
            })
    }

    ver(req, res) {
        Permit.find({ owner: req.user._id })
            .then(response => {
                console.log('Respuesta: ', response);
                res.send(response);
            }).catch(e => {
                res.sendStatus(500);
                console.log('Error:', e);
            })
    }
}

module.exports = new PermitController();