import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure route segment options
export const dynamic = 'force-dynamic'; // Default to dynamic for POST
export const revalidate = 60; // Revalidate cache every 60 seconds for GET

// Import Listing model
import Listing from '@/models/listing';

export async function GET(request: NextRequest) {
  // Handle keep-warm requests if implemented
  if (request.nextUrl.searchParams.has('keepWarm')) {
    return NextResponse.json({ status: 'warm' }, { status: 200 });
  }

  try {
    await connectDB();
    
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    // Build query
    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (status) query.status = status;
    
    // Add search functionality if present
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const listings = await Listing.find(query).sort({ createdAt: -1 });
    
    // Add cache headers for better performance
    return NextResponse.json(
      { data: listings },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=600'
        }
      }
    );
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
      
      // Define the type for Cloudinary upload result
      interface CloudinaryUploadResult {
        secure_url: string;
        // Add other properties if needed
      }
      
      // Upload to Cloudinary
      const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "listing-images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        
        // Create a readable stream from buffer and pipe to uploadStream
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
      { 
        success: true, 
        data: newListing, 
        listingId: newListing._id, 
        message: "Your listing was created successfully. Please save this ID to make changes in the future."
      },
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