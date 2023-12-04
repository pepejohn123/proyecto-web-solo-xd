const Document = require('./../models/document');
const Permit = require('./../models/permit');
const mongoose = require('mongoose');

class DocumentController {
    insertar(req, res) {
        console.log("ENTRASTE AL CONTROLLER");
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

    actualizar(req, res) {
        console.log("ENTRASTE AL PUT");
        console.log(req.body);
        const documentId = req.body.id; // Assuming you have the document ID in the URL
        console.log(documentId);
        var data = {
        }
        if ('name' in req.body && req.body.name !== null && req.body.name !== undefined) {
            console.log('The field "name" exists and has a non-null/undefined value.');
            data.name = req.body.name;
        } else {
            console.log('The field "name" either does not exist or has a null/undefined value.');
        }

        if ('expedition_date' in req.body && req.body.expedition_date !== null && req.body.expedition_date !== undefined) {
            console.log('The field "expedition_date" exists and has a non-null/undefined value.');
            data.expedition_date = req.body.expedition_date;
        } else {
            console.log('The field "expedition_date" either does not exist or has a null/undefined value.');
        }

        if ('expiration_date' in req.body && req.body.expiration_date !== null && req.body.expiration_date !== undefined) {
            console.log('The field "expiration_date" exists and has a non-null/undefined value.');
            data.expiration_date = req.body.expiration_date;
        } else {
            console.log('The field "expiration_date" either does not exist or has a null/undefined value.');
        }

        if ('ext' in req.body && req.body.ext !== null && req.body.ext !== undefined) {
            console.log('The field "ext" exists and has a non-null/undefined value.');
            data.ext = req.body.ext;
        } else {
            console.log('The field "ext" either does not exist or has a null/undefined value.');
        }
        console.log(data);
        Document.findOneAndUpdate({ _id: documentId }, { $set: data }, { new: true },)
            .then(response => {
                console.log('Respuesta: ', response);
                res.send(response);
            }).catch(e => {
                res.sendStatus(500);
                console.log('Error:', e);
            })

    }

    borrar(req, res) {
        var documentId = new mongoose.Types.ObjectId(req.body.documentId)
        var userId = req.user._id
        console.log(documentId);
        console.log(userId);
        Document.findById(documentId)
            .then(foundDocument => {
                if (foundDocument) {
                    console.log('Document found:');
                    userId = new mongoose.Types.ObjectId(userId);
                    var owner = new mongoose.Types.ObjectId(foundDocument.owner);
                    console.log(userId);
                    console.log(owner);
                    if (userId.equals(owner)) {
                        Permit.deleteOne({ document: documentId})
                            .then(deletedPermits => {
                                if (deletedPermits) {
                                    console.log('Permits deleted:', deletedPermits);
                                    Document.findByIdAndDelete(documentId)
                                        .then(deletedPermits => {
                                            if (deletedPermits) {
                                                console.log('Document deleted:', deletedPermits);
                                            } else {
                                                console.log('Document not found or not deleted.');
                                            }
                                        })
                                        .catch(err => {
                                            console.error('Delete error:', err);
                                        });
                                } else {
                                    console.log('Permits not found or not deleted.');
                                }
                            })
                            .catch(err => {
                                console.error('Delete error:', err);
                            });
                    }
                    else {
                        res.sendStatus(401);
                    }
                } else {
                    console.log('Document not found.');
                    res.sendStatus(404);

                }
            })
            .catch(err => {
                console.error('Find by ID error:', err);
            });


    }

    porNombre(req, res){
        console.log("buscar x nombre");
        const documentName = req.params.name;


        const userId =  new mongoose.Types.ObjectId(req.user._id)
        console.log(documentName);
        console.log(userId);
        Document.find({ owner: userId, name: documentName})
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