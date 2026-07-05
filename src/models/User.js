import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    // Optional because Google users won't have a password
  },
  provider: {
    type: String,
    default: 'credentials',
  },
  role: {
    type: String,
    default: 'user',
  },
}, { timestamps: true });

// Check if the model already exists to prevent OverwriteModelError in Next.js HMR
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
