const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model('Contact', ContactSchema);
