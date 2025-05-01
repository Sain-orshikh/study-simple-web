import mongoose, { Schema, Document, Model } from 'mongoose';

// Define interface for the document
interface IPodcastSubscriber extends Document {
  email: string;
  isActive: boolean;
  dateSubscribed: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const podcastSubscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v: string) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid email address!`
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  dateSubscribed: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create and export the model
// Check if the model exists before creating a new one to prevent overwriting in development
const PodcastSubscriber: Model<IPodcastSubscriber> = 
  mongoose.models.PodcastSubscriber || mongoose.model<IPodcastSubscriber>('PodcastSubscriber', podcastSubscriberSchema);

export default PodcastSubscriber;