const Permit = require('./../models/permit');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

class PermitController {
    insertar(req, res) {
        console.log("ENTRASTE AL CONTROLLER de permisos");
        const documentData = req.body;
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

    porDocumento(req, res) {
        console.log("buscar x nombre");
        console.log(req.params.id)
        var docId = new mongoose.Types.ObjectId(req.params.id)
        console.log(docId);
        Permit.findOne({ document: docId })
            .then(updatedDocument => {
                console.log('Updated Document:', updatedDocument);

                if (updatedDocument) {
                    console.log('Updated Document:', updatedDocument);
                    res.send(updatedDocument);
                } else {
                    res.send(updatedDocument);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                res.sendStatus(500);
            });
    }

    add(req, res) {
        console.log("Añadir/Editar permiso");
        console.log(req.body);

        if (req.body.public !== undefined) {
            // Handle the case when 'public' is present in req.body
            var public_bool = req.body.public === 'true';
            console.log(public_bool);
            const docId = new mongoose.Types.ObjectId(req.body.document);
            var data = {
                public: public_bool
            }
            Permit.findOneAndUpdate({ document: docId }, { $set: data }, { new: true },)
            .then(response => {
                console.log('Respuesta: ', response);
                res.send(response);
            }).catch(e => {
                res.sendStatus(500);
                console.log('Error:', e);
            })
        } else {
            // Handle the case when 'public' is not present in req.body
            const docId = new mongoose.Types.ObjectId(req.body.document);
            const email = req.body.add;

            Permit.findOneAndUpdate(
                { document: docId },
                { $push: { permitted_users: email } },
                { new: true }
            )
                .then(updatedDocument => {
                    if (updatedDocument) {
                        console.log('Updated Document:', updatedDocument);
                        res.send(updatedDocument);
                    } else {
                        res.sendStatus(404); // Document not found
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        }
    }



    borrar(req, res) {
        console.log("Borrar permiso");

        console.log(req.body);
        const docId = new mongoose.Types.ObjectId(req.body.document)
        const email = req.body.remove

        Permit.findOneAndUpdate(
            { document: docId },
            { $pull: { permitted_users: email } }
        )
            .then(updatedDocument => {
                if (updatedDocument) {
                    console.log('Updated Document:', updatedDocument);
                    res.send(updatedDocument);
                } else {
                    res.sendStatus(404); // Document not found
                }
            })
            .catch(error => {
                console.error('Error:', error);
                res.sendStatus(500);
            });
    }
}

module.exports = new PermitController();