"use client"

import { useState, useEffect } from "react"
import { MarketItem } from "./ItemCard"
import toast from "react-hot-toast"

interface FetchMarketItemsOptions {
  category?: string;
  search?: string;
}

interface SupportTicket {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactSellerData {
  itemName: string;
  buyerEmail: string;
  sellerEmail?: string;
  message?: string;
}

export function useMarketItems(options: FetchMarketItemsOptions = {}) {
  const { category, search } = options
  
  // State for the listing ID alert
  const [createdListingId, setCreatedListingId] = useState<string | null>(null);
  const [showListingIdAlert, setShowListingIdAlert] = useState(false);
  const [items, setItems] = useState<MarketItem[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState<string | null>(null);

  // Add useEffect to fetch items when the component mounts or when search parameters change
  useEffect(() => {
    fetchItems();
  }, [category, search]);

  const fetchItems = async () => {
    setLoading(true);
    try {
        // Build query URL with all applicable parameters
        const params = new URLSearchParams();
        if (category && category !== "All") {
            params.append('category', category);
        }
        if (search) {
            params.append('search', search);
        }
        
        const queryString = params.toString();
        const url = `/api/listings${queryString ? `?${queryString}` : ''}`;
        
        // Use cache-aware fetch with proper caching control
        const response = await fetch(url, {
            // This enables utilizing the cache headers we set on the server
            next: { revalidate: 60 }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }
        
        const data = await response.json();
        setItems(data.data);
        return data.data;
    } catch (error) {
        console.error('Error fetching market items:', error);
        toast.error('Failed to load market items');
        setError('Failed to load market items');
    } finally {
        setLoading(false);
    }
  };

  const fetchItemById = async (id: string) => {
    try {
      const response = await fetch(`/api/listings/${id}`);
      
      // Handle 404 specifically with a more user-friendly message
      if (response.status === 404) {
        console.log(`Listing with ID ${id} not found`);
        return null; // Return null for "not found" to allow proper handling
      }
      
      if (!response.ok) {
        throw new Error(`Failed to fetch item details: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Return null if the data is empty or doesn't contain expected fields
      if (!data || !Object.keys(data).length) {
        console.log('Empty response when fetching listing');
        return null;
      }
      
      // Normalize the data structure by ensuring both id and _id are available
      // This prevents issues with different components expecting different ID field names
      if (data && data._id) {
        data.id = data._id;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching item details:', error);
      throw error; // Let the calling component handle the toast display
    }
  };

  const createListing = async (formData: FormData) => {
    try {
        const response = await fetch("/api/listings", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to create listing');
        }

        const data = await response.json();
        fetchItems(); // Refresh the listings
        
        // Set the created listing ID and show the alert
        // Check for listingId in multiple possible locations
        const listingId = data.listingId || (data.data && data.data._id) || null;
        
        if (listingId) {
            setCreatedListingId(listingId);
            setShowListingIdAlert(true);
            toast.success('Listing created successfully');
        }
        
        return data;
    } catch (error) {
        console.error('Error creating listing:', error);
        toast.error('Failed to create listing');
        throw error;
    }
  };

  const updateListing = async ({ listingId, formData }: { listingId: string, formData: FormData }) => {
    try {
        // Create a debug object to help diagnose form data issues
        const debugFormData: Record<string, any> = {};
        formData.forEach((value, key) => {
            debugFormData[key] = value instanceof File ? `File: ${value.name}` : value;
        });
        console.log("Updating listing with data:", debugFormData);

        const response = await fetch(`/api/listings/${listingId}`, {
            method: "PATCH",
            // Do NOT set Content-Type header manually when sending FormData
            // The browser will automatically set it with the correct boundary
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Server error response:", errorText);
            throw new Error(`Failed to update listing: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        fetchItems(); // Refresh the listings
        toast.success('Listing updated successfully');
        return data;
    } catch (error) {
        console.error('Error updating listing:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        toast.error(`Failed to update listing: ${errorMessage}`);
        throw error;
    }
  };

  const submitSupportRequest = async (formData: SupportTicket) => {
    try {
        const response = await fetch("/api/support", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit support request');
        }

        const data = await response.json();
        toast.success('Support request submitted successfully');
        return data;
    } catch (error) {
        console.error('Error submitting support request:', error);
        toast.error('Failed to submit support request');
        throw error;
    }
  };

  const contactSeller = async (contactData: ContactSellerData) => {
    try {
        const response = await fetch("/api/listings/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
        });

        if (!response.ok) {
            throw new Error('Failed to send message to seller');
        }

        const data = await response.json();
        toast.success('Message sent successfully');
        return data;
    } catch (error) {
        console.error('Error contacting seller:', error);
        toast.error('Failed to send message to seller');
        throw error;
    }
  };

  // Handle closing the listing ID alert
  const handleCloseListingIdAlert = () => {
    setShowListingIdAlert(false);
  };

  return {
    items,
    isLoading,
    isError,
    createListing,
    updateListing,
    fetchItemById,
    contactSeller,
    submitSupportRequest,
    // Return state and handlers for the listing ID alert
    createdListingId,
    showListingIdAlert,
    handleCloseListingIdAlert
  }
}