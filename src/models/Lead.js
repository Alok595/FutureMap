import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email.'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address.',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number.'],
    },
    currentClass: {
      type: String,
      required: [true, 'Please provide your current class.'],
    },
    domain: {
      type: String,
      required: [true, 'Please select an interested domain.'],
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
