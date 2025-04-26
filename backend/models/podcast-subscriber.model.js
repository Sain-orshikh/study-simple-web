import mongoose from "mongoose";

const podcastSubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
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

const PodcastSubscriber = mongoose.model("PodcastSubscriber", podcastSubscriberSchema);

export default PodcastSubscriber;