import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: 'General' | 'Pricing' | 'Availability' | 'Maintenance' | 'Legal' | 'Other';
  message: string;
  isRead: boolean;
  replyMessage?: string;
  repliedAt?: Date;
  isReplied?: boolean;
  createdAt: Date;
}

const InquirySchema: Schema = new Schema(
  {
    fullName:    { type: String, required: true },
    email:       { type: String, required: true },
    phone:       { type: String, default: '' },
    inquiryType: {
      type: String,
      enum: ['General', 'Pricing', 'Availability', 'Maintenance', 'Legal', 'Other'],
      required: true,
    },
    message:      { type: String, required: true },
    isRead:       { type: Boolean, default: false },
    replyMessage: { type: String },
    repliedAt:    { type: Date },
    isReplied:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

if (mongoose.models.Inquiry) {
  delete (mongoose.models as any).Inquiry;
}

const Inquiry: Model<IInquiry> = mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
