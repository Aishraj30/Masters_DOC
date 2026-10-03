import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  userId: string;
  title: string;
  canvasData: string; // JSON string representation of fabric.js canvas state
  thumbnailUrl?: string;
  pagesCount: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      default: 'Untitled Design',
      trim: true,
    },
    canvasData: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    pagesCount: {
      type: Number,
      default: 1,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
