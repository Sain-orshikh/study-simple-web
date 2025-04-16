import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
import Listing from "../models/listing.model.js";

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
