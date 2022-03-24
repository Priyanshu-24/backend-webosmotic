const Contact = require('../models/Contact');
const jwt = require('jsonwebtoken');

module.exports = {
  getContactsByUserId(req, res) {
    jwt.verify(req.token, 'secret', async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const { user_id } = req.headers;

        try {
          const events = await Contact.find({ user: authData.user._id });

          if (events) {
            return res.json({ authData, events });
          }
        } catch (error) {
          return res.status(400).json({
            message: `We do not have any events with the user_id : ${user_id}`,
          });
        }
      }
    });
  },
};
