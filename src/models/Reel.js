import mongoose from 'mongoose';

const ReelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true, // Cloudinary URL
  },
  thumbnailUrl: {
    type: String,
    // Optional Cloudinary image URL
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Reel = mongoose.models.Reel || mongoose.model('Reel', ReelSchema);
export default Reel;
