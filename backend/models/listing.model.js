import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        default: "",
    },
    description:{
        type: String,
        required: true,
        default: "",
    },
    image:{
        type: String,
        required: true,
        default: "",
    },
    category:{
        type: String,
        required: true,
        default: "",
    },
    price:{
        type: Number,
        required: true,
        default: 0,
    },
    hidePrice:{
        type: Boolean,
        default: false,
    },
    condition:{
        type: String,
        required: true,
        default: "",
    },
    email:{
        type: String,
        required: true,
        default: "",
    },
    phoneNumber:{
        type: String,
        default: "",
    },
    seller:{
        type: String,
        default: "anonymous",
    },
    facebookUsername:{
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ['available', 'sold', 'reserved', 'unavailable'],
        default: 'available',
    },

},{timestamps: true}); // createdAt and updatedAt are automatically added

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;