const User = require('./../models/user');
const Profile = require('./../models/profile');

class RegisterController {
  async register(req, res) {
    try {
      const userData = req.body;
      console.log(req.body);

      const userResponse = await User.create(userData);
      console.log('User created:', userResponse);

      if (userResponse) {
        req.body.owner = userResponse._id;
        console.log('User created, req used and response', req.body, userResponse);

        const profileResponse = await Profile.create(req.body);
        console.log('Profile created:', profileResponse);

        if (profileResponse) {
          req.body.owner = profileResponse._id;
          console.log('Profile created, req used and response', req.body, profileResponse);
          // Handle any additional logic after creating a profile if needed
          res.send(response);

        } else {
          res.sendStatus(400);
        }
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      console.log('Error during registration:', err);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new RegisterController();
