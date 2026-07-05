import mongoose from 'mongoose';

const MentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // Cloudinary URL
  },
  bio: {
    type: String,
    required: true,
  },
  linkedinUrl: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Mentor = mongoose.models.Mentor || mongoose.model('Mentor', MentorSchema);
export default Mentor;
