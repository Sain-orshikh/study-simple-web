import PodcastSubscriber from "../models/podcast-subscriber.model.js";
import { sendSubscriptionConfirmation } from "../utils/emailService.js";

// Subscribe to podcast updates
export const subscribeToPodcast = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide a valid email address" 
            });
        }

        // Check if email already exists
        const existingSubscriber = await PodcastSubscriber.findOne({ email });
        
        if (existingSubscriber) {
            // If subscriber exists but was inactive, reactivate
            if (!existingSubscriber.isActive) {
                existingSubscriber.isActive = true;
                await existingSubscriber.save();
                
                // Send confirmation email
                try {
                    await sendSubscriptionConfirmation(email);
                } catch (emailError) {
                    console.log("Error sending confirmation email:", emailError);
                    // Continue even if email fails
                }
                
                return res.status(200).json({
                    success: true,
                    message: "Your subscription has been reactivated."
                });
            }
            
            return res.status(200).json({
                success: true,
                message: "You are already subscribed to podcast updates."
            });
        }

        // Create new subscriber
        const newSubscriber = new PodcastSubscriber({
            email
        });

        await newSubscriber.save();

        // Send confirmation email
        try {
            await sendSubscriptionConfirmation(email);
        } catch (emailError) {
            console.log("Error sending confirmation email:", emailError);
            // Continue even if email fails
        }

        res.status(201).json({ 
            success: true, 
            message: "Successfully subscribed to podcast updates!" 
        });
    } catch (error) {
        console.log("Error in podcast subscription:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Server error. Please try again." 
        });
    }
};

// Unsubscribe from podcast updates
export const unsubscribeFromPodcast = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const subscriber = await PodcastSubscriber.findOne({ email });

        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: "Subscriber not found"
            });
        }

        // Instead of deleting, set isActive to false
        subscriber.isActive = false;
        await subscriber.save();

        res.status(200).json({
            success: true,
            message: "Successfully unsubscribed from podcast updates"
        });
    } catch (error) {
        console.log("Error in podcast unsubscription:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again."
        });
    }
};

// Get all active subscribers
export const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await PodcastSubscriber.find({ isActive: true })
            .sort({ dateSubscribed: -1 });

        res.status(200).json({
            success: true,
            count: subscribers.length,
            data: subscribers
        });
    } catch (error) {
        console.log("Error fetching subscribers:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again."
        });
    }
};