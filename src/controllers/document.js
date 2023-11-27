const Document = require('./../models/document');
const jwt = require('jsonwebtoken');

class DocumentController {
    insertar(req, res) {
        req.body.owner = req.user._id
        const documentData = req.body;
        
        console.log(req.user._id);
        Document.create(documentData)
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
        Document.find({ owner: req.user._id })
            .then(response => {
                console.log('Respuesta: ', response);
                res.send(response);
            }).catch(e => {
                res.sendStatus(500);
                console.log('Error:', e);
            })
    }
}

module.exports = new DocumentController();