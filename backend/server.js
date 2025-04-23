import path from "path";
import express from "express";
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import cors from "cors";

import blogRoutes from "./routes/blog.route.js";
import listingRoutes from "./routes/listing.route.js";
import supportRoutes from "./routes/support.route.js";
import eventProposalRoutes from "./routes/event-proposal.route.js";
import tutorRoutes from "./routes/tutor.route.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}); 

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json({limit: "5mb"})); //to parse req.body
app.use(express.urlencoded({ extended: true })); //to parse form data

app.use('/api/blogs', blogRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/event-proposals', eventProposalRoutes);
app.use('/api/tutors', tutorRoutes);

if (process.env.NODE_ENV === "development") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    connectMongoDB();
});