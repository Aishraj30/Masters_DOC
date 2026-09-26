import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMedia extends Document {
  userId: string;
  url: string;
  publicId?: string;
  filename?: string;
  source: 'upload' | 'camera' | 'stock';
  size?: number;
  mimeType?: string;
  createdAt: Date;
}

const MediaSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    default: '',
  },
  filename: {
    type: String,
    default: 'Untitled Media',
  },
  source: {
    type: String,
    enum: ['upload', 'camera', 'stock'],
    default: 'upload',
  },
  size: {
    type: Number,
    default: 0,
  },
  mimeType: {
    type: String,
    default: 'image/png',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Media: Model<IMedia> = mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);

export default Media;
