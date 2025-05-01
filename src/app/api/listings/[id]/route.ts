import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Import Listing model
import Listing from '@/models/listing';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const listingId = params.id;
    const listing = await Listing.findById(listingId);
    
    if (!listing) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    console.error("Error fetching listing:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const listingId = params.id;
    const listing = await Listing.findById(listingId);
    
    if (!listing) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }
    
    await Listing.findByIdAndDelete(listingId);
    
    return NextResponse.json(
      { message: "Listing deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting listing:", error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const listingId = params.id;
    const listing = await Listing.findById(listingId);
    
    if (!listing) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }
    
    const formData = await request.formData();
    
    // Extract update data from form
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const price = formData.get('price') ? Number(formData.get('price')) : undefined;
    const hidePrice = formData.get('hidePrice') !== null ? formData.get('hidePrice') === 'true' : undefined;
    const condition = formData.get('condition') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const seller = formData.get('seller') as string;
    const facebookUsername = formData.get('facebookUsername') as string;
    const status = formData.get('status') as string;
    const imageFile = formData.get('image') as File;
    const imageUrl = formData.get('imageUrl') as string;
    
    // Prepare update object with only provided fields
    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (price !== undefined) updateData.price = price;
    if (hidePrice !== undefined) updateData.hidePrice = hidePrice;
    if (condition) updateData.condition = condition;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (seller) updateData.seller = seller;
    if (facebookUsername) updateData.facebookUsername = facebookUsername;
    if (status) updateData.status = status;
    
    // Handle image update if provided
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Upload to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "listing-images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        
        // Create a readable stream from buffer and pipe to uploadStream
        const Readable = require('stream').Readable;
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
      });
      
      updateData.image = uploadResult.secure_url;
    } else if (imageUrl) {
      // Upload URL to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(imageUrl, {
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
    
    return NextResponse.json(
      {
        success: true,
        message: "Listing updated successfully",
        data: updatedListing
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating listing:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}