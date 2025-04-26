import express from "express";
import { 
    subscribeToPodcast, 
    unsubscribeFromPodcast, 
    getAllSubscribers 
} from "../controller/podcast-subscriber.controller.js";

const router = express.Router();

// Routes for podcast subscription
router.post("/subscribe", subscribeToPodcast);
router.post("/unsubscribe", unsubscribeFromPodcast);
router.get("/all", getAllSubscribers);

export default router;