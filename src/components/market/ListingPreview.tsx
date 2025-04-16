"use client"

import React from 'react'
import { MarketItem } from './ItemCard'
import { PhoneIcon, MailIcon } from "lucide-react"
import { FaFacebook } from "react-icons/fa"

const ListingPreview: React.FC<{listing: Partial<MarketItem>}> = ({listing}) => {
  // Format price display
  const formatPrice = () => {
    if (listing.hidePrice) {
      return "₮#####";
    } else if (listing.price) {
      return `₮${Number(listing.price).toLocaleString()}`;
    } else {
      return "₮0";
    }
  };
  
  return (
    <div className='w-full h-full overflow-auto bg-white p-8'>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="relative">
          <div className="flex flex-col md:flex-row gap-6 p-6">
            {/* Image */}
            <div className="flex-shrink-0 flex flex-col items-center">
              {listing.image ? (
                <img
                  src={typeof listing.image === 'string' ? listing.image : URL.createObjectURL(listing.image)}
                  alt={listing.name || "Item preview"}
                  className="w-60 h-60 object-cover rounded-md shadow-md"
                />
              ) : (
                <div className="w-60 h-60 bg-gray-200 flex items-center justify-center rounded-md">
                  <p className="text-gray-500">No image</p>
                </div>
              )}
              <span className="font-bold text-green-600 text-center text-xl mt-3">
                {formatPrice()}
                {listing.hidePrice && <span className="text-sm text-gray-500 block">(Price is hidden from public view)</span>}
              </span>
            </div>

            {/* Details */}
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-2">{listing.name || "Item Title"}</h2>
              
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {listing.category || "Category"}
                </span>
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm ml-2">
                  Condition: {listing.condition || "Not specified"}
                </span>
                {listing.status && (
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm ml-2">
                    Status: {listing.status}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">
                  {listing.description || "No description provided."}
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-700 mb-2">Seller Details</h3>
                <p className="mb-1">
                  <span className="font-medium">Seller:</span> {listing.seller || "Anonymous"}
                </p>
                
                <h4 className="font-medium text-sm mt-3">Contact Information:</h4>
                <div className="space-y-2 mt-2">
                  {listing.phoneNumber && (
                    <div className="flex items-center text-sm" key="phone">
                      <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                      {listing.phoneNumber}
                    </div>
                  )}
                  {listing.email && (
                    <div className="flex items-center text-sm" key="email">
                      <MailIcon className="h-4 w-4 mr-2 text-gray-500" />
                      {listing.email}
                    </div>
                  )}
                  {listing.facebookUsername && (
                    <div className="flex items-center text-sm" key="facebook">
                      <FaFacebook className="h-4 w-4 mr-2 text-blue-600" />
                      {listing.facebookUsername}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingPreview