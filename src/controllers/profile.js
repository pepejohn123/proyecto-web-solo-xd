const mongoose = require('mongoose');
const Profile = require('./../models/profile');

class ProfileController {
    new(req, res) {
        const userData = req.body;
        console.log(req.body);
        Profile.create(userData)
            .then(response => {
                console.log(response);
                if (response) {
                    console.log('User created:', response);
                    res.send(response);


                }
                else {
                    res.sendStatus(400);
                }
            })
            .catch(err => {
                console.log('Login error:', err);
            })
    }

    public(req, res) {
        const userName = req.params.parameter;
        console.log(userName);
      
        // Construct the base query with the public: true condition
        const baseQuery = { public: true };
      
        // Conditionally add $or clauses if userName is not empty
        if (userName) {
          baseQuery.$or = [
            { first_name: userName },
            { fathers_last_name: userName },
            { mothers_last_name: userName },
            { nationality: userName },
            { civil_state: userName },
            { birth_entity: userName },
            { birth_municipality: userName },
            { entity_of_birth: userName },
            { genre: userName },
          ];
        }
      
        // Execute the query
        Profile.find(baseQuery)
          .then(response => {
            console.log(response);
            if (response) {
              console.log('All public:', response);
              res.send(response);
            } else {
              res.sendStatus(400);
            }
          })
          .catch(err => {
            console.log('Error:', err);
            res.sendStatus(500);
          });
      }
      

    lookByID(req, res) {
        const userId =  new mongoose.Types.ObjectId(req.user._id);
        Profile.findOne(
            {
                owner: userId
                }
        )
            .then(response => {
                console.log(response);
                if (response) {
                    console.log('Your profile:', response);
                    res.send(response);

                    
                }
                else {
                    res.sendStatus(400);
                    
                }
            })
            .catch(err => {
                console.log('Login error:', err);
            })
    }

    editar(req, res) {
        const userId =  new mongoose.Types.ObjectId(req.user._id);
        console.log("el request:"+req.body.public);
        var data = {
            public: req.body.public
        }
        console.log("tas en el controlador"+data);

        Profile.findOneAndUpdate(
            { owner: userId }, { $set: data }, { new: true },
        )
            .then(response => {
                if (response) {
                    console.log('Your profile:', response.public);
                    res.send(response);

                    
                }
                else {
                    res.sendStatus(400);
                    
                }
            })
            .catch(err => {
                console.log('Login error:', err);
            })
    }

}

module.exports = new ProfileController();