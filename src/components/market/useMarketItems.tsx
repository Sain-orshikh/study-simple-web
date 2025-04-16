"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
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

export function useMarketItems(options: FetchMarketItemsOptions = {}) {
  const queryClient = useQueryClient()
  const { category, search } = options
  
  // State for the listing ID alert
  const [createdListingId, setCreatedListingId] = useState<string | null>(null);
  const [showListingIdAlert, setShowListingIdAlert] = useState(false);

  // Construct query key based on filters
  const queryKey = ['marketItems', { category, search }]

  // Fetch market items from the backend API
  const {
    data: items,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        // Build URL with query parameters if they exist
        let url = "http://localhost:5000/api/listings/fetch"
        const params = new URLSearchParams()
        
        if (category && category !== "All") {
          params.append("category", category)
        }
        
        if (search) {
          params.append("search", search)
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`
        }
        
        const response = await fetch(url)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to fetch listings")
        }
        
        const data = await response.json()
        return data.data as MarketItem[]
      } catch (error) {
        console.error("Error fetching market items:", error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Fetch a single listing by ID
  const fetchListingById = async (id: string): Promise<MarketItem | null> => {
    try {
      const response = await fetch(`http://localhost:5000/api/listings/fetch/${id}`)
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch listing")
      }
      
      return await response.json()
    } catch (error) {
      console.error("Error fetching listing by ID:", error)
      return null
    }
  }

  // Mutation for creating a new listing
  const createListing = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const response = await fetch("http://localhost:5000/api/listings/create", {
          method: "POST",
          body: formData,
        })
        
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || "Failed to create listing")
        }
        
        return await response.json()
      } catch (error) {
        console.error("Error creating listing:", error)
        throw error
      }
    },
    onSuccess: (result) => {
      // Show the listing ID to the user using the new component
      setCreatedListingId(result.listingId);
      setShowListingIdAlert(true);
      
      // Invalidate queries to refetch data with new filters
      queryClient.invalidateQueries({ queryKey: ['marketItems'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to list item. Please try again.")
    }
  })

  // Mutation for updating an existing listing
  const updateListing = useMutation({
    mutationFn: async ({ listingId, formData }: { listingId: string, formData: FormData }) => {
      try {
        const response = await fetch(`http://localhost:5000/api/listings/update/${listingId}`, {
          method: "PUT",
          body: formData,
        })
        
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || "Failed to update listing")
        }
        
        return await response.json()
      } catch (error) {
        console.error("Error updating listing:", error)
        throw error
      }
    },
    onSuccess: (result) => {
      toast.success("Item updated successfully!")
      
      // Invalidate queries to refetch data with new filters
      queryClient.invalidateQueries({ queryKey: ['marketItems'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update item. Please try again.")
    }
  })

  // Mutation for submitting a support ticket
  const submitSupportTicket = useMutation({
    mutationFn: async (data: SupportTicket) => {
      try {
        const response = await fetch("http://localhost:5000/api/support/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || "Failed to submit support ticket")
        }
        
        return await response.json()
      } catch (error) {
        console.error("Error submitting support ticket:", error)
        throw error
      }
    },
    onSuccess: (result) => {
      toast.success(result.message || "Support ticket submitted successfully!")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit support ticket. Please try again.")
    }
  })

  // Mutation for contacting seller (client-side only)
  const contactSeller = useMutation({
    mutationFn: async (item: MarketItem) => {
      // This is a client-side only action
      // Create contact info string to display
      let contactInfo = "Seller contact information:\n";
      if (item.email) contactInfo += `Email: ${item.email}\n`;
      if (item.phoneNumber) contactInfo += `Phone: ${item.phoneNumber}\n`;
      if (item.facebookUsername) contactInfo += `Facebook: ${item.facebookUsername}\n`;
      
      // Show contact info to the user
      
      return { success: true, item };
    },
    onError: () => {
      toast.error("Failed to retrieve contact information. Please try again.")
    }
  })
  
  // Handle closing the listing ID alert
  const handleCloseListingIdAlert = () => {
    setShowListingIdAlert(false);
  };

  return {
    items,
    isLoading,
    isError,
    error,
    createListing: createListing.mutate,
    isCreatingListing: createListing.isPending,
    updateListing: updateListing.mutate,
    isUpdatingListing: updateListing.isPending,
    fetchListingById,
    contactSeller: contactSeller.mutate,
    isContactingSeller: contactSeller.isPending,
    submitSupportTicket: submitSupportTicket.mutate,
    isSubmittingSupportTicket: submitSupportTicket.isPending,
    // Return state and handlers for the listing ID alert
    createdListingId,
    showListingIdAlert,
    handleCloseListingIdAlert
  }
}