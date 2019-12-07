import mongoose from 'mongoose';
import User from './user.interface';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createdEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;