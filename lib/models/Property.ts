import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  category: 'Apartment' | 'Studio' | 'Office' | 'Villa';
  location: string;
  district: string;
  monthlyRate: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  amenities: string[];
  petPolicy: string;
  utilitiesIncluded: string[];
  availableFrom: Date;
  isAvailable: boolean;
  images: string[];
  createdAt: Date;
}

const PropertySchema: Schema = new Schema(
  {
    title:              { type: String, required: true },
    category:           { type: String, enum: ['Apartment', 'Studio', 'Office', 'Villa'], required: true },
    location:           { type: String, required: true },
    district:           { type: String, required: true },
    monthlyRate:        { type: Number, required: true },
    description:        { type: String, required: true },
    bedrooms:           { type: Number, default: 0 },
    bathrooms:          { type: Number, default: 1 },
    areaSqft:           { type: Number, required: true },
    amenities:          [{ type: String }],
    petPolicy:          { type: String, default: 'No Pets Allowed' },
    utilitiesIncluded:  [{ type: String }],
    availableFrom:      { type: Date, required: true },
    isAvailable:        { type: Boolean, default: true },
    images:             [{ type: String }],
  },
  { timestamps: true }
);

const Property: Model<IProperty> =
  mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);

export default Property;
