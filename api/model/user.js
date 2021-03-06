import mongoose, { Schema } from 'mongoose';
import { accessibleFieldsPlugin, accessibleRecordsPlugin } from '@casl/mongoose';

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
  },
  forget_password_id: {
    type: String,
  },
  specialties: {
    type: [String],
  },
  banner: {
    type: String,
  },
  bio: {
    type: String,
  },
  customer_id: {
    type: String,
  },
});

User.plugin(accessibleFieldsPlugin);
User.plugin(accessibleRecordsPlugin);

User.method('modelName', () => 'User', { suppressWarning: true });

export default mongoose.model('User', User);
