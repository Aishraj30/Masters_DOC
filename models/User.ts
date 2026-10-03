import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPaymentRecord {
  orderId?: string;
  paymentId?: string;
  amount?: number;
  planType?: string;
  paidAt?: Date;
}

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  password?: string;
  avatarUrl?: string;
  provider: 'password' | 'google';
  role?: 'user' | 'admin';
  createdAt: Date;
  isPro?: boolean;
  subscriptionPlan?: 'free' | 'pro_monthly' | 'pro_yearly';
  subscriptionStatus?: 'active' | 'inactive' | 'cancelled';
  subscriptionExpiresAt?: Date;
  oneTimePassesCount?: number;
  payments?: IPaymentRecord[];
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  provider: {
    type: String,
    enum: ['password', 'google'],
    default: 'password',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isPro: {
    type: Boolean,
    default: false,
  },
  subscriptionPlan: {
    type: String,
    enum: ['free', 'pro_monthly', 'pro_yearly'],
    default: 'free',
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'inactive', 'cancelled'],
    default: 'inactive',
  },
  subscriptionExpiresAt: {
    type: Date,
  },
  oneTimePassesCount: {
    type: Number,
    default: 0,
  },
  payments: [
    {
      orderId: { type: String },
      paymentId: { type: String },
      amount: { type: Number },
      planType: { type: String },
      paidAt: { type: Date, default: Date.now },
    },
  ],
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
