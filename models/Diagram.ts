import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDiagram extends Document {
  title: string; // Mandatory & Unique name
  svgPath: string; // SVG path data string
  strokeColor?: string;
  strokeWidth?: number;
  sourcePhotoUrl?: string;
  promptUsed?: string;
  creatorId: string;
  creatorName: string;
  creatorEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  isGlobal: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DiagramSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // Ensured unique case-insensitive lookup
    },
    svgPath: {
      type: String,
      required: true,
    },
    strokeColor: {
      type: String,
      default: '#00c4cc',
    },
    strokeWidth: {
      type: Number,
      default: 2,
    },
    sourcePhotoUrl: {
      type: String,
      default: '',
    },
    promptUsed: {
      type: String,
      default: '',
    },
    creatorId: {
      type: String,
      required: true,
      index: true,
    },
    creatorName: {
      type: String,
      default: 'Community Member',
    },
    creatorEmail: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
    isGlobal: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Diagram: Model<IDiagram> =
  mongoose.models.Diagram || mongoose.model<IDiagram>('Diagram', DiagramSchema);

export default Diagram;
