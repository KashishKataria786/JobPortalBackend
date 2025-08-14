import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  job_position: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  company_logo:{
    type:String
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Internship', 'Contract', 'Freelance', 'Temporary'],
    required: true,
  },
  workMode: {
    type: String,
    enum: ['Onsite', 'Remote', 'Hybrid'],
    default: 'Onsite',
  },
  description: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: [String],
    default: [],
  },
  requirements: {
    type: [String],
    default: [],
  },
  salary: {
    type: String, // Can be string like "₹6 LPA", or range
    default: "Negotiable",
  },
  experienceLevel: {
    type: String,
    enum: ['Fresher', '0-1 years', '1-3 years', '3-5 years', '5+ years'],
    default: 'Fresher',
  },
  education: {
    type: String,
    default: 'Not specified',
  },
  skills: {
    type: [String],
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  applicants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resumeUrl: String,
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Rejected', 'Accepted'],
      default: 'Applied',
    }
  }],
}, {
  timestamps: true,
});

export const JobModel = mongoose.model('Job', JobSchema);
