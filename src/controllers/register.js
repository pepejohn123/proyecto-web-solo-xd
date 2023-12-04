const User = require('./../models/user');
const Profile = require('./../models/profile');

class RegisterController {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      // Check if a user with the provided email already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        // User with the same email already exists, send a failed response
        return res.status(400).send('User with this email already exists');
      }

      // Proceed with user creation if the email is not found
      const userResponse = await User.create({ email, password, type });
      console.log('User created:', userResponse);

      if (userResponse) {
        req.body.owner = userResponse._id;

        const profileResponse = await Profile.create(req.body);
        console.log('Profile created:', profileResponse);

        if (profileResponse) {
          req.body.owner = profileResponse._id;
          console.log('Profile created, req used and response', req.body, profileResponse);
          // Handle any additional logic after creating a profile if needed
          res.send(profileResponse);
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
