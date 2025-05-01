"use client"

import { useState } from "react"
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

  const fetchItems = async (category?: string) => {
    setLoading(true);
    try {
        let url = "/api/listings"
        if (category) {
            url += `?category=${category}`;
        }
        
        const response = await fetch(url);
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
      const response = await fetch(`/api/listings/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch item details');
      }
      const item = await response.json();
      return item;
    } catch (error) {
      console.error('Error fetching item details:', error);
      toast.error('Failed to load item details');
      throw error;
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
        return data;
    } catch (error) {
        console.error('Error creating listing:', error);
        toast.error('Failed to create listing');
        throw error;
    }
  };

  const updateListing = async (listingId: string, formData: FormData) => {
    try {
        const response = await fetch(`/api/listings/${listingId}`, {
            method: "PATCH",
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to update listing');
        }

        const data = await response.json();
        fetchItems(); // Refresh the listings
        return data;
    } catch (error) {
        console.error('Error updating listing:', error);
        toast.error('Failed to update listing');
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
        const response = await fetch("/api/tutors/contact", {
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