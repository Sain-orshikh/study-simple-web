"use client"

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MdOutlineImage } from "react-icons/md";
import Upload from "../../../assets/upload.png";
import toast, { Toaster } from "react-hot-toast";

const ListingEditor = () => {
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const isEditMode = !!editId;

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('New');
  const [category, setCategory] = useState('Books');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);

  const conditions = ["New", "Like New", "Good", "Fair", "Poor"];
  const categories = ["Books", "Electronics", "Clothing", "Furniture", "Sports", "Other"];

  useEffect(() => {
    // If in edit mode, fetch the listing data
    if (editId) {
      fetchListingData();
    }
  }, [editId]);

  // Function to fetch listing data when editing an existing listing
  const fetchListingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/listings/${editId}`);
      const data = await response.json();
      
      if (response.ok) {
        // Populate the form with the listing data
        setTitle(data.title || '');
        setDescription(data.description || '');
        setPrice(data.price?.toString() || '');
        setCondition(data.condition || 'New');
        setCategory(data.category || 'Books');
        setContact(data.contact || '');
        setImagePreview(data.image || null);
      } else {
        toast.error("Failed to fetch listing data");
      }
    } catch (error) {
      console.error("Error fetching listing:", error);
      toast.error("Error fetching listing data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !price || !category || !condition || !contact) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!image && !imagePreview) {
      toast.error("Please upload an image");
      return;
    }

    // Create form data for submission
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('condition', condition);
    formData.append('category', category);
    formData.append('contact', contact);

    if (image) {
      formData.append('image', image);
    } else if (typeof imagePreview === 'string' && !image && isEditMode) {
      // If we're in edit mode and no new image was selected, pass the existing image URL
      formData.append('imageUrl', imagePreview);
    }

    // Determine API endpoint (create or update)
    const apiEndpoint = editId 
        ? `/api/listings/${editId}`
        : '/api/listings';
    
    try {
      setLoading(true);
      
      const response = await fetch(apiEndpoint, {
        method: editId ? 'PATCH' : 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success || response.ok) {
        toast.success(isEditMode ? 'Listing updated successfully!' : 'Listing created successfully!');
        if (!isEditMode) {
          // Clear form after successful submission (only in create mode)
          setTitle('');
          setDescription('');
          setPrice('');
          setCondition('New');
          setCategory('Books');
          setContact('');
          setImage(null);
          setImagePreview(null);
        }
      } else {
        toast.error(data.error || 'Error processing listing');
      }
    } catch (error) {
      console.error('Error with listing:', error);
      toast.error("Error processing listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border py-4 w-full min-h-screen">
      <Toaster />
      <div className="w-[80%] mx-auto my-5 font-bold text-2xl text-center">
        {isEditMode ? "Update Listing" : "Create New Listing"}
      </div>

      <form className="w-[80%] mx-auto space-y-4" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="space-y-2">
          <label className="block text-lg font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter listing title"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-lg font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your item in detail"
            className="w-full border p-2 rounded min-h-[150px]"
            required
          />
        </div>

        {/* Price, Condition, and Category Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-lg font-semibold">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full border p-2 rounded"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              {conditions.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          <label className="block text-lg font-semibold">Contact Information</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Email or phone number"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-lg font-semibold">Listing Image</label>
          <div className="flex items-center justify-center">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              {imagePreview ? (
                <img 
                  src={imagePreview as string} 
                  alt="Preview" 
                  className="object-contain w-full h-full" 
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <MdOutlineImage className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden" 
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : (isEditMode ? "Update Listing" : "Create Listing")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingEditor;