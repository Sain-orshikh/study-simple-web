import mongoose, { Schema, Document, Model } from 'mongoose';

// Define interface for the document
interface IListing extends Document {
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  hidePrice: boolean;
  condition: string;
  email: string;
  phoneNumber: string;
  seller: string;
  facebookUsername: string;
  status: 'available' | 'sold' | 'reserved' | 'unavailable';
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const listingSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  category: {
    type: String,
    required: true,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  hidePrice: {
    type: Boolean,
    default: false,
  },
  condition: {
    type: String,
    required: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  seller: {
    type: String,
    default: "anonymous",
  },
  facebookUsername: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved', 'unavailable'],
    default: 'available',
  },
}, { timestamps: true });

// Add indexes to improve query performance
// These indexes will speed up the frequently used filters and searches
listingSchema.index({ category: 1 }); // Index for category filtering
listingSchema.index({ status: 1 }); // Index for status filtering
listingSchema.index({ createdAt: -1 }); // Index for sorting by latest
listingSchema.index({ name: 'text', description: 'text' }); // Text index for search functionality

// Create and export the model
// Check if the model exists before creating a new one to prevent overwriting in development
const Listing: Model<IListing> =
  mongoose.models.Listing || mongoose.model<IListing>('Listing', listingSchema);

export default Listing;