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

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    
    // Build query
    const query: any = {};
    if (category) query.category = category;
    if (status) query.status = status;
    
    const listings = await Listing.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ data: listings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const formData = await request.formData();
    
    // Extract fields from form data
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const price = Number(formData.get('price')) || 0;
    const hidePrice = formData.get('hidePrice') === 'true';
    const condition = formData.get('condition') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const seller = formData.get('seller') as string || 'anonymous';
    const facebookUsername = formData.get('facebookUsername') as string;
    const imageFile = formData.get('image') as File;
    const directUrl = formData.get('imageUrl') as string;
    
    // Validate required fields
    if (!name || !description || !category || !condition || !email || (!imageFile && !directUrl)) {
      return NextResponse.json(
        { success: false, error: "Please provide all required fields and an image" },
        { status: 400 }
      );
    }
    
    // Process image upload
    let finalImageUrl;
    
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
      
      finalImageUrl = uploadResult.secure_url;
    } else if (directUrl) {
      // Upload URL to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(directUrl, {
        folder: "listing-images",
      });
      finalImageUrl = uploadedImage.secure_url;
    }
    
    // Create new listing
    const newListing = new Listing({
      name,
      description,
      image: finalImageUrl,
      category,
      price,
      hidePrice,
      condition,
      email,
      phoneNumber,
      seller,
      facebookUsername,
      status: 'available'
    });
    
    await newListing.save();
    
    return NextResponse.json(
      { success: true, data: newListing },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}