import mongoose from 'mongoose';

const SuccessStorySchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  course: {
    type: String,
  },
  testimonial: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // Cloudinary URL
  },
  videoReel: {
    type: String,
    // Optional Cloudinary Video URL
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const SuccessStory = mongoose.models.SuccessStory || mongoose.model('SuccessStory', SuccessStorySchema);
export default SuccessStory;
