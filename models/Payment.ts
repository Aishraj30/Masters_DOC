import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPayment extends Document {
  userId?: string;
  userEmail?: string;
  orderId: string;
  paymentId?: string;
  signature?: string;
  amount: number; // in INR
  currency: string;
  planType: 'pass' | 'pro_monthly' | 'pro_yearly';
  status: 'created' | 'paid' | 'failed';
  isSimulated: boolean;
  createdAt: Date;
}

const PaymentSchema: Schema = new Schema({
  userId: {
    type: String,
    default: 'guest',
    index: true,
  },
  userEmail: {
    type: String,
    default: '',
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  paymentId: {
    type: String,
    default: '',
  },
  signature: {
    type: String,
    default: '',
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  planType: {
    type: String,
    enum: ['pass', 'pro_monthly', 'pro_yearly'],
    required: true,
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    default: 'created',
  },
  isSimulated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
