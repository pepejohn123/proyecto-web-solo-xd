const { log } = require('console');
const Permit = require('./../models/permit');


const permitMiddleware = (req, res, next) => {
    const user = req.user;
    //const json {

    //}
    const parts = req.url.split('/');

    // Take the first part and split it by "."
    const filenameParts = parts[1].split('.');

    // Remove everything after the first element of the filenameParts array
    const result = filenameParts.slice(0, 1).join('.');

    console.log(result);
    console.log("permit auth");
    Permit.findOne({ document: result })
        .then(response => {
            if (response) {
                var email = user.email;
                const owner_check = response.owner == req.user._id;
                const permitted_check = response.permitted_users.includes(email);
                if (owner_check || permitted_check) {
                    next();
                }
                //res.send({ _id, email });
                else {
                    res.sendStatus(400);
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

module.exports = permitMiddleware;