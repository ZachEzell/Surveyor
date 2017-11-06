const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // Recipient is a separate subdocument, allowing us to store more data
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  // This is used to associate WHICH user will be associated with this survey
  // type is going to assign a unique ID
  // ref is referencing to the User collection
  // underscores are used to represent a relationship to the User model
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});
// name of schema, schema
mongoose.model('surveys', surveySchema);
