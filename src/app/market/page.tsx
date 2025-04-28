"use client"

import Sidebar from "@/components/sidebar/sidebar"
import { Button } from "@/components/ui/button"
import { SearchIcon, ShoppingCartIcon, EditIcon, HelpCircleIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Modal, Box } from "@mui/material"
import { Toaster } from "react-hot-toast"
import { ItemCard } from "@/components/market/ItemCard"
import { useMarketItems } from "@/components/market/useMarketItems"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MarketplaceGuidelines } from "@/components/market/MarketplaceGuidelines"
import ListingPreview from "@/components/market/ListingPreview"
import { CreateListingModal } from "@/components/market/CreateListingModal"
import { EditListingModal } from "@/components/market/EditListingModal"
import { SupportTicketModal } from "@/components/market/SupportTicketModal"
import { ListingIDAlert } from "@/components/market/ListingIDAlert"

// Create a client
const queryClient = new QueryClient()

function MarketPageContent() {
  // Modal states
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  // Preview state
  const [previewListing, setPreviewListing] = useState<any>(null);
  
  // Search state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const conditions = ["New", "Like New", "Good", "Fair", "Poor"];
  const categories = ["All", "Textbooks", "Electronics", "Lab Equipment", "Supplies", "Furniture", "Other"];
  const statuses = ["available", "sold", "reserved", "unavailable"];

  const { 
    items, 
    isLoading, 
    isError, 
    createListing, 
    isCreatingListing,
    updateListing,
    isUpdatingListing,
    fetchListingById,
    contactSeller,
    submitSupportTicket,
    isSubmittingSupportTicket,
    // New props for ListingIDAlert
    createdListingId,
    showListingIdAlert,
    handleCloseListingIdAlert
  } = useMarketItems({
    category: selectedCategory,
    search: searchQuery
  });

  // Modal handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePreview = (listing: any) => {
    setPreviewListing(listing);
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  return (
    <>
      <Sidebar>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <main className="space-y-8">
          <h1 className="text-3xl font-bold mb-6">Student Marketplace</h1>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Search for items..." 
                className="pl-10" 
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setOpenCreateModal(true)}>
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Sell an Item
              </Button>
              <Button onClick={() => setEditModalOpen(true)} variant="outline">
                <EditIcon className="h-5 w-5 mr-2" />
                Edit Listing
              </Button>
              <Button onClick={() => setSupportOpen(true)} variant="outline">
                <HelpCircleIcon className="h-5 w-5 mr-2" />
                Support
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm ${
                  category === selectedCategory ? "bg-blue-100 text-blue-800" : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p className="text-xl text-red-500">Error loading listings. Please try again later.</p>
            </div>
          ) : !items || items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">
                {selectedCategory !== "All" 
                  ? `No items found in the "${selectedCategory}" category.` 
                  : "No listings found. Be the first to sell an item!"}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {items.map((item) => (
                <ItemCard 
                  key={item._id || item.id} 
                  item={item} 
                  onContactClick={contactSeller} 
                />
              ))}
            </div>
          )}

          <div className="mt-8">
            <MarketplaceGuidelines />
          </div>
        </main>
      </div>

      {/* Create Listing Modal */}
      <CreateListingModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSubmit={createListing}
        isSubmitting={isCreatingListing}
        onPreview={handlePreview}
        categories={categories}
        conditions={conditions}
      />
      
      {/* Edit Listing Modal */}
      <EditListingModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={updateListing}
        isSubmitting={isUpdatingListing}
        fetchListingById={fetchListingById}
        categories={categories}
        conditions={conditions}
        statuses={statuses}
      />
      
      {/* Support Ticket Modal */}
      <SupportTicketModal
        open={supportOpen}
        onClose={() => setSupportOpen(false)}
        onSubmit={submitSupportTicket}
        isSubmitting={isSubmittingSupportTicket}
      />
      
      {/* Preview Modal */}
      <Modal open={previewOpen} onClose={handlePreviewClose}>
        <Box sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '800px',
          height: '90%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 1,
          overflow: 'auto'
        }}>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Listing Preview</h2>
            <button 
              onClick={handlePreviewClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {previewListing && (
            <ListingPreview listing={previewListing} />
          )}
        </Box>
      </Modal>
      
      {/* Listing ID Alert */}
      {createdListingId && (
        <ListingIDAlert
          id={createdListingId}
          open={showListingIdAlert}
          onClose={handleCloseListingIdAlert}
        />
      )}

      <Toaster />
    </Sidebar>
    </>
  );
}

// Wrap the page with QueryClientProvider
export default function MarketPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <MarketPageContent />
    </QueryClientProvider>
  );
}

