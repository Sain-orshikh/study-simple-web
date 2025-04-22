"use client"

import { useState } from "react"
import { Modal, Box, TextField, MenuItem, FormControl, InputLabel, Select, Tabs, Tab } from "@mui/material"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { MarketItem } from "./ItemCard"

interface EditListingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: ({ listingId, formData }: { listingId: string, formData: FormData }) => void;
  isSubmitting: boolean;
  fetchListingById: (id: string) => Promise<MarketItem | null>;
  categories: string[];
  conditions: string[];
  statuses: string[];
}

export function EditListingModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  fetchListingById,
  categories,
  conditions,
  statuses
}: EditListingModalProps) {
  // Edit form state
  const [listingId, setListingId] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editHidePrice, setEditHidePrice] = useState(false);
  const [editCategory, setEditCategory] = useState("");
  const [editCondition, setEditCondition] = useState("");
  const [editSellerName, setEditSellerName] = useState("");
  const [editPhoneNumber, setEditPhoneNumber] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editFacebookUsername, setEditFacebookUsername] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState("available");
  const [editDescWordCount, setEditDescWordCount] = useState(0);
  const [fetchingListing, setFetchingListing] = useState(false);
  const [editTabValue, setEditTabValue] = useState(0);

  const MAX_WORD_COUNT = 50; // Maximum words for description

  const resetForm = () => {
    setListingId("");
    setEditName("");
    setEditDescription("");
    setEditDescWordCount(0);
    setEditPrice("");
    setEditHidePrice(false);
    setEditCategory("");
    setEditCondition("");
    setEditSellerName("");
    setEditPhoneNumber("");
    setEditEmail("");
    setEditFacebookUsername("");
    setEditImage(null);
    setEditImagePreview(null);
    setEditStatus("available");
    setEditTabValue(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleEditTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setEditTabValue(newValue);
  };

  const handleEditImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEditImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setEditImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDesc = e.target.value;
    const wordCount = newDesc.trim() ? newDesc.trim().split(/\s+/).length : 0;
    
    if (wordCount <= MAX_WORD_COUNT) {
      setEditDescription(newDesc);
      setEditDescWordCount(wordCount);
    } else {
      // Don't update if the word count exceeds the limit
      toast.error(`Description cannot exceed ${MAX_WORD_COUNT} words.`);
    }
  };

  const isEditFormValid = () => {
    // At minimum we need the ID and at least one field to update
    if (!listingId) {
      toast.error("Please enter a listing ID");
      return false;
    }
    
    // Check if any field has been changed (at least one must be changed)
    const hasChanges = editName || editDescription || editPrice || editCategory || 
      editCondition || editSellerName || editPhoneNumber || editEmail || 
      editFacebookUsername || editImage || editStatus !== "available" || editHidePrice;
      
    if (!hasChanges) {
      toast.error("Please make at least one change to update");
      return false;
    }
    
    // Validate email if provided
    if (editEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editEmail)) {
        toast.error("Please enter a valid email address");
        return false;
      }
    }
    
    // Validate phone number if provided
    if (editPhoneNumber) {
      const phoneRegex = /^[0-9]{8}$/;
      if (!phoneRegex.test(editPhoneNumber)) {
        toast.error("Phone number must be 8 digits");
        return false;
      }
    }
    
    return true;
  };

  const handleFetchListing = async () => {
    if (!listingId) {
      toast.error("Please enter a listing ID");
      return;
    }
    
    setFetchingListing(true);
    try {
      const listing = await fetchListingById(listingId);
      if (listing) {
        // Populate the form with the listing data
        setEditName(listing.name || "");
        setEditDescription(listing.description || "");
        setEditPrice(listing.price?.toString() || "");
        setEditCategory(listing.category || "");
        setEditCondition(listing.condition || "");
        setEditSellerName(listing.seller || "");
        setEditPhoneNumber(listing.phoneNumber || "");
        setEditEmail(listing.email || "");
        setEditFacebookUsername(listing.facebookUsername || "");
        setEditStatus(listing.status || "available");
        setEditHidePrice(listing.hidePrice || false);
        setEditImagePreview(listing.image || null);
        setEditDescWordCount(listing.description?.trim().split(/\s+/).length || 0);
        
        // Switch to the edit tab
        setEditTabValue(1);
        toast.success("Listing found! You can now edit it.");
      } else {
        toast.error("Listing not found. Please check the ID and try again.");
      }
    } catch (error) {
      toast.error("Error fetching listing. Please try again.");
    } finally {
      setFetchingListing(false);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEditFormValid()) {
      return;
    }

    const formData = new FormData();
    if (editName) formData.append("name", editName);
    if (editDescription) formData.append("description", editDescription);
    if (editPrice) formData.append("price", editPrice);
    formData.append("hidePrice", editHidePrice.toString());
    if (editCategory) formData.append("category", editCategory);
    if (editCondition) formData.append("condition", editCondition);
    if (editSellerName) formData.append("seller", editSellerName);
    if (editPhoneNumber) formData.append("phoneNumber", editPhoneNumber);
    if (editEmail) formData.append("email", editEmail);
    if (editFacebookUsername) formData.append("facebookUsername", editFacebookUsername);
    if (editStatus) formData.append("status", editStatus);
    if (editImage) {
      formData.append("image", editImage);
    }
    
    onSubmit({ listingId, formData });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 1,
        maxWidth: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Manage Your Listing</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <Tabs value={editTabValue} onChange={handleEditTabChange} centered className="mb-4">
          <Tab label="Find Listing" />
          <Tab label="Edit Listing" disabled={!listingId} />
        </Tabs>
        
        {editTabValue === 0 && (
          <div className="p-1">
            <p className="text-sm text-gray-600 mb-4">
              Enter your listing ID to edit or update its status. 
              You should have received this ID when you created the listing.
            </p>
            <TextField
              label="Listing ID"
              value={listingId}
              onChange={(e) => setListingId(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <div className="flex justify-end mt-4">
              <Button 
                onClick={handleFetchListing}
                className="bg-blue-500 hover:bg-blue-600 text-black"
                disabled={fetchingListing || !listingId}
              >
                {fetchingListing ? "Searching..." : "Find Listing"}
              </Button>
            </div>
          </div>
        )}
        
        {editTabValue === 1 && (
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                You're editing listing ID: <span className="font-bold">{listingId}</span>
              </p>
            </div>
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as string)}
                label="Status"
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              label="Item Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              fullWidth
              margin="normal"
              placeholder="Leave blank to keep current value"
            />
            
            <TextField
              label="Description"
              value={editDescription}
              onChange={handleEditDescriptionChange}
              fullWidth
              multiline
              rows={3}
              margin="normal"
              inputProps={{ maxLength: 500 }}
              helperText={`${editDescWordCount}/${MAX_WORD_COUNT} words`}
              placeholder="Leave blank to keep current value"
            />
            
            <TextField
              label="Price (₮)"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              fullWidth
              type="number"
              margin="normal"
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
              placeholder="Leave blank to keep current value"
            />
            
            <div className="flex items-center mt-1 mb-3">
              <input
                type="checkbox"
                id="edit-hide-price"
                checked={editHidePrice}
                onChange={(e) => setEditHidePrice(e.target.checked)}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="edit-hide-price" className="text-sm text-gray-600">
                Hide price from public view (buyers must contact you for price)
              </label>
            </div>
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="edit-category-label">Category</InputLabel>
              <Select
                labelId="edit-category-label"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value as string)}
                label="Category"
              >
                <MenuItem value="">
                  <em>Leave unchanged</em>
                </MenuItem>
                {categories.slice(1).map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="edit-condition-label">Condition</InputLabel>
              <Select
                labelId="edit-condition-label"
                value={editCondition}
                onChange={(e) => setEditCondition(e.target.value as string)}
                label="Condition"
              >
                <MenuItem value="">
                  <em>Leave unchanged</em>
                </MenuItem>
                {conditions.map((cond) => (
                  <MenuItem key={cond} value={cond}>
                    {cond}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              label="Seller Name"
              value={editSellerName}
              onChange={(e) => setEditSellerName(e.target.value)}
              fullWidth
              margin="normal"
              placeholder="Leave blank to keep current value"
            />
            
            <TextField
              label="Phone Number"
              value={editPhoneNumber}
              onChange={(e) => setEditPhoneNumber(e.target.value)}
              fullWidth
              margin="normal"
              placeholder="Leave blank to keep current value"
              helperText="8-digit format"
            />
            
            <TextField
              label="Email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              fullWidth
              margin="normal"
              placeholder="Leave blank to keep current value"
            />
            
            <TextField
              label="Facebook Username"
              value={editFacebookUsername}
              onChange={(e) => setEditFacebookUsername(e.target.value)}
              fullWidth
              margin="normal"
              placeholder="Leave blank to keep current value"
            />
            
            <div className="my-4">
              <p className="text-sm mb-2">Update Image (Optional)</p>
              <input
                accept="image/*"
                type="file"
                onChange={handleEditImageChange}
                id="edit-upload-image"
                style={{ display: "none" }}
              />
              <label htmlFor="edit-upload-image">
                <Button className="bg-blue-500 hover:bg-blue-600 text-black" type="button" asChild>
                  <span>Select New Image</span>
                </Button>
              </label>
              {(editImagePreview || editImage) && (
                <div className="mt-3">
                  <img 
                    src={editImage ? URL.createObjectURL(editImage) : editImagePreview as string} 
                    alt="Preview" 
                    className="max-h-40 rounded border" 
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                onClick={handleClose} 
                variant="outline"
                type="button"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-black"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Listing"}
              </Button>
            </div>
          </form>
        )}
      </Box>
    </Modal>
  );
}