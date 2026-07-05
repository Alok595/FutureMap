import mongoose from 'mongoose';

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'General',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
export default FAQ;
