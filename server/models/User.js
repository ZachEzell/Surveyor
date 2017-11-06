const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  // Type, number, default 0. User starts off with $0
  credits: { type: Number, default: 0 }
});

//create a new model named users with userSchema
mongoose.model('users', userSchema);
