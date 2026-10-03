import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFeedback extends Document {
  userId?: string;
  userEmail?: string;
  rating: number;
  comments?: string;
  designTitle?: string;
  exportFormat?: string;
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
  },
  userEmail: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comments: {
    type: String,
    default: '',
  },
  designTitle: {
    type: String,
    default: 'Untitled Design',
  },
  exportFormat: {
    type: String,
    default: 'PNG',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback: Model<IFeedback> =
  mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;
