import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IApplication extends Document {
  propertyId: mongoose.Types.ObjectId;
  propertyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  employmentStatus: 'Employed' | 'Self-Employed' | 'Unemployed' | 'Student';
  grossAnnualIncome: number;
  proposedMoveIn: Date;
  status: 'Under Review' | 'Approved' | 'Rejected';
  notes: string;
  createdAt: Date;
}

const ApplicationSchema: Schema = new Schema(
  {
    propertyId:         { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    propertyTitle:      { type: String, required: true },
    fullName:           { type: String, required: true },
    email:              { type: String, required: true },
    phone:              { type: String, required: true },
    employmentStatus:   { type: String, enum: ['Employed', 'Self-Employed', 'Unemployed', 'Student'], required: true },
    grossAnnualIncome:  { type: Number, required: true },
    proposedMoveIn:     { type: Date, required: true },
    status:             { type: String, enum: ['Under Review', 'Approved', 'Rejected'], default: 'Under Review' },
    notes:              { type: String, default: '' },
  },
  { timestamps: true }
);

const Application: Model<IApplication> =
  mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;
