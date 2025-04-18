"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { TagIcon, UserIcon, PhoneIcon, MailIcon, CalendarIcon, Clock2Icon, TagsIcon } from "lucide-react"
import { useState } from "react"
import { FaFacebook } from "react-icons/fa"
import toast from "react-hot-toast"

export interface MarketItem {
  id: string;
  name: string;
  category: string;
  price: number;
  hidePrice?: boolean;
  condition: string;
  seller: string;
  image: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  phoneNumber?: string;
  email?: string;
  facebookUsername?: string;
  status?: string;
}

interface ItemCardProps {
  item: MarketItem;
  onContactClick?: (item: MarketItem) => void;
}

export function ItemCard({ item, onContactClick }: ItemCardProps) {
  const [showContact, setShowContact] = useState(false);
  
  const handleContactClick = () => {
    setShowContact(!showContact);
    // Still call the original handler for compatibility
    if (onContactClick && !showContact) {
      onContactClick(item);
    }
  };

  const handleContactByEmail = () => {
    if (item.email) {
      const subject = `Inquiry about your listing: ${item.name}`;
      const body = `Hello,\n\nI am interested in your listing "${item.name}" on the Student Marketplace.\n\nPlease let me know if it's still available.\n\nThank you!`;
      window.open(`mailto:${item.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      toast.success("Opening email client...");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format the price display - show masked or actual price
  const formatPrice = () => {
    if (!item.hidePrice) {
      return `₮${item.price.toLocaleString()}`;
    } else {
      // Always return masked price if hidePrice is true
      return "₮#####";
    }
  };

  // Get status badge styling
  const getStatusBadgeClass = () => {
    switch (item.status) {
      case 'sold':
        return 'bg-red-100 text-red-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'unavailable':
        return 'bg-gray-100 text-gray-800';
      case 'available':
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0 flex flex-col items-center">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            width={150}
            height={150}
            className="rounded-md"
          />
          <div className="flex flex-col items-center mt-2">
            <span className="font-bold text-center">
              {formatPrice()}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              {item.status && (
                <span className={`text-xs px-2 py-1 rounded ${getStatusBadgeClass()}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <TagIcon className="h-4 w-4 mr-1 flex-shrink-0" />
              {item.category}
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <UserIcon className="h-4 w-4 mr-1 flex-shrink-0" />
              {item.seller || "Anonymous"}
            </div>
            <p className="text-sm mt-2 line-clamp-3 overflow-hidden">{item.description}</p>
            <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 rounded">
              Condition: {item.condition}
            </span>
            
            <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
              {item.createdAt && (
                <div className="flex items-center" key="created">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  Posted: {formatDate(item.createdAt)}
                </div>
              )}
              {item.updatedAt && item.updatedAt !== item.createdAt && (
                <div className="flex items-center ml-2" key="updated">
                  <Clock2Icon className="h-3 w-3 mr-1" />
                  Updated: {formatDate(item.updatedAt)}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-3">
            {showContact ? (
              <div className="border-t pt-3 space-y-2">
                <h3 className="font-medium text-sm">Contact Information:</h3>
                {item.phoneNumber && (
                  <div className="flex items-center text-sm" key="phone">
                    <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                    {item.phoneNumber}
                  </div>
                )}
                {item.email && (
                  <div className="flex items-center justify-between text-sm" key="email">
                    <div className="flex items-center">
                      <MailIcon className="h-4 w-4 mr-2 text-gray-500" />
                      {item.email}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={handleContactByEmail} 
                      className="text-xs py-1 px-2"
                    >
                      Send Email
                    </Button>
                  </div>
                )}
                {item.facebookUsername && (
                  <div className="flex items-center text-sm" key="facebook">
                    <FaFacebook className="h-4 w-4 mr-2 text-blue-600" />
                    {item.facebookUsername}
                  </div>
                )}
                <Button size="sm" variant="outline" onClick={handleContactClick} className="w-full mt-2">
                  Hide Contact Info
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={handleContactClick} className="w-full">
                Contact Seller
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}