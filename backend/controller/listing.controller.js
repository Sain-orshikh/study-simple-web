import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
import Listing from "../models/listing.model.js";
import { sendEmail } from "../utils/emailService.js";

export const fetchListing = async (req,res) => {
    const listingId = req.params.id;
    try {
        const listing = await Listing.findById(listingId);
        if(!listing) return res.status(404).json({error: "Listing not found"});
        res.status(200).json(listing);
    } catch (error) {
        console.log("error in fetching listing:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const fetchListings = async (req, res) => {
    try {
        const { category, search } = req.query;
        
        // Build filter object
        const filter = {};
        
        if (category && category !== "All") {
            filter.category = category;
        }
        
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const listings = await Listing.find(filter).sort({createdAt: -1});

        res.status(200).json({ data: listings });
    } catch (error) {
        console.log("error in fetching listings:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createListing = async (req, res) => {
    try {
      const { name, description, category, price, condition, email, phoneNumber, seller, facebookUsername, imageUrl: directUrl, hidePrice } = req.body;
      console.log("directUrl:", directUrl);
      console.log("file:", req.file);
      console.log("hidePrice:", hidePrice);
      if (!req.file && !directUrl) {
        return res.status(400).json({
          success: false,
          error: "Please provide an image",
        });
      }
      if (!name || !description || !category || !price || !condition || !email || (!req.file && !directUrl)) {
        return res.status(400).json({
          success: false,
          error: "Please provide all required fields and an image",
        });
      }
  
      let finalImageUrl;
  
      if (req.file) {
        // Uploaded file via multer (use streamifier + cloudinary)
        const streamUpload = (buffer) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "listing-images" },
              (error, result) => {
                if (result) resolve(result);
                else reject(error);
              }
            );
            streamifier.createReadStream(buffer).pipe(stream);
          });
  
        const uploadedImage = await streamUpload(req.file.buffer);
        finalImageUrl = uploadedImage.secure_url;
      } else if (directUrl) {
        // User provided a URL string
        // Optionally re-upload to Cloudinary for CDN benefits
        const uploadedImage = await cloudinary.uploader.upload(directUrl, {
          folder: "listing-images",
        });
        finalImageUrl = uploadedImage.secure_url;
      }
  
      const newListing = new Listing({
        name,
        description,
        category,
        price,
        condition,
        email,
        phoneNumber: phoneNumber || "",
        seller: seller || "anonymous",
        facebookUsername: facebookUsername || "",
        image: finalImageUrl,
        hidePrice: hidePrice === "true" || hidePrice === true ? true : false,
      });
  
      await newListing.save();
  
      res.status(201).json({ 
        success: true, 
        message: "Your listing was created successfully. Please save this ID to make changes in the future:",
        listingId: newListing._id,
        data: newListing 
      });
  
    } catch (err) {
      console.error("Error creating listing:", err.message);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };

export const updateListing = async (req, res) => {
  try {
    const { listingId } = req.params;

    // First check if the listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ success: false, error: "Listing not found" });
    }

    // Extract update data from request body
    const { 
      name, description, category, price, condition, 
      email, phoneNumber, seller, facebookUsername, status, hidePrice
    } = req.body;

    // Prepare update object with only provided fields
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (price) updateData.price = price;
    if (condition) updateData.condition = condition;
    if (email) updateData.email = email;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (seller) updateData.seller = seller;
    if (facebookUsername !== undefined) updateData.facebookUsername = facebookUsername;
    if (status && ['available', 'sold', 'reserved', 'unavailable'].includes(status)) {
      updateData.status = status;
    }
    if (hidePrice !== undefined) {
      updateData.hidePrice = hidePrice === "true" || hidePrice === true ? true : false;
    }

    // Handle image update if provided
    if (req.file) {
      const streamUpload = (buffer) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "listing-images" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });

      const uploadedImage = await streamUpload(req.file.buffer);
      updateData.image = uploadedImage.secure_url;
    } else if (req.body.imageUrl) {
      // User provided a URL string
      const uploadedImage = await cloudinary.uploader.upload(req.body.imageUrl, {
        folder: "listing-images",
      });
      updateData.image = uploadedImage.secure_url;
    }

    // Update the listing
    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: updatedListing
    });

  } catch (error) {
    console.error("Error updating listing:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const deleteListing = async (req, res) => {
    try {
        const listingId = req.params.id;
        
        let listing = await Listing.findById(listingId);
        if(!listing) return res.status(404).json({error: "Listing not found"});

        await Listing.findByIdAndDelete(listingId);

        res.status(200).json({message: "Listing deleted successfully"});
    } catch (error) {
        console.log("error in deleting listing:", error);
        res.status(500).json({error: "Server Error"});
    }
};

export const submitSupportTicket = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: "Please provide all required fields"
      });
    }
    
    // Here you would typically save the support ticket to a database
    // or send an email to the administrator
    
    // For now, we'll just log it
    console.log("Support ticket received:", { name, email, subject, message });
    
    res.status(200).json({
      success: true,
      message: "Your support ticket has been submitted successfully. Our team will get back to you soon."
    });
    
  } catch (error) {
    console.error("Error submitting support ticket:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const contactSeller = async (req, res) => {
  try {
    const { itemName, buyerEmail, sellerEmail, message } = req.body;
    
    // Validate required fields
    if (!itemName || !buyerEmail || !sellerEmail) {
      return res.status(400).json({
        success: false,
        error: "Please provide all required fields"
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(buyerEmail) || !emailRegex.test(sellerEmail)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format"
      });
    }

    // Send email to seller using Resend
    const emailText = `A buyer (${buyerEmail}) is interested in your item "${itemName}". Please contact them to discuss further.`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Interest in Your Marketplace Listing</h2>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Hello,</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">A buyer with email <strong>${buyerEmail}</strong> is interested in your item:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 15px 0;">
          <h3 style="margin-top: 0; color: #007bff;">${itemName}</h3>
        </div>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Please contact them to discuss further details about your item.</p>
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
          <p>This is an automated message from the Student Marketplace. Please do not reply to this email.</p>
        </div>
      </div>
    `;
    
    try {
      const result = await sendEmail({
        to: sellerEmail,
        subject: `New interest in your listing: ${itemName}`,
        text: emailText,
        html: emailHtml
      });
      
      console.log("Email sent successfully with Resend:", result);
      
      res.status(200).json({
        success: true,
        message: "Interest notification sent to the seller."
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      
      // Provide more detailed error message based on the error type
      let errorMessage = "Failed to send email notification.";
      
      if (emailError.statusCode === 401) {
        errorMessage = "Email service authentication failed. Please contact the administrator.";
      } else if (emailError.statusCode === 429) {
        errorMessage = "Too many email requests. Please try again later.";
      }
      
      res.status(500).json({ 
        success: false, 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? emailError.message : undefined
      });
    }
    
  } catch (error) {
    console.error("Error contacting seller:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
