const Contact = require('../models/Contact');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
  createContact(req, res) {
    jwt.verify(req.token, 'secret', async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const { name, email, phone } = req.body;

        const user = await User.findById(authData.user._id);

        if (!user) {
          return res.status(400).json({ message: 'User does not exists!' });
        }

        try {
          const event = await Contact.create({
            name,
            email,
            phone,
            user: authData.user._id,
          });

          return res.json(event);
        } catch (error) {
          return res.status(400).json({ message: error });
        }
      }
    });
  },
};
