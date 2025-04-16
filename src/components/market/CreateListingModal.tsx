"use client"

import { useState } from "react"
import { Modal, Box, TextField, MenuItem, FormControl, InputLabel, Select, Divider } from "@mui/material"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "lucide-react"
import toast from "react-hot-toast"

interface CreateListingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  isSubmitting: boolean;
  onPreview: (listing: any) => void;
  categories: string[];
  conditions: string[];
}

export function CreateListingModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  onPreview,
  categories,
  conditions
}: CreateListingModalProps) {
  // Form state
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [hidePrice, setHidePrice] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[1] || "");
  const [condition, setCondition] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [descWordCount, setDescWordCount] = useState(0);
  const [sellerName, setSellerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [facebookUsername, setFacebookUsername] = useState("");

  const MAX_WORD_COUNT = 50; // Reduced maximum words for description

  const resetForm = () => {
    setItemName("");
    setDescription("");
    setDescWordCount(0);
    setPrice("");
    setHidePrice(false);
    setCondition("");
    setImage(null);
    setImagePreview(null);
    setSellerName("");
    setPhoneNumber("");
    setEmail("");
    setFacebookUsername("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDesc = e.target.value;
    const wordCount = newDesc.trim() ? newDesc.trim().split(/\s+/).length : 0;
    
    if (wordCount <= MAX_WORD_COUNT) {
      setDescription(newDesc);
      setDescWordCount(wordCount);
    } else {
      // Don't update if the word count exceeds the limit
      toast.error(`Description cannot exceed ${MAX_WORD_COUNT} words.`);
    }
  };

  const isFormValid = () => {
    // Check required fields
    if (!itemName || !description || !price || !condition || !email) {
      return false;
    }
    
    // Validate phone number if provided (Mongolian 8-digit format)
    if (phoneNumber) {
      const phoneRegex = /^[0-9]{8}$/;
      if (!phoneRegex.test(phoneNumber)) {
        toast.error("Phone number must be 8 digits");
        return false;
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const handlePreview = () => {
    // Validate required fields before showing preview
    if (!itemName || !description || !price) {
      toast.error("Please fill in the name, description, and price before previewing");
      return;
    }
    
    onPreview({
      name: itemName,
      description,
      price: Number(price) || 0,
      hidePrice: hidePrice,
      category: selectedCategory,
      condition,
      seller: sellerName || "Anonymous",
      image: imagePreview || image,
      phoneNumber,
      email,
      facebookUsername,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("hidePrice", hidePrice.toString());
    formData.append("category", selectedCategory);
    formData.append("condition", condition);
    formData.append("seller", sellerName.trim() || "Anonymous");
    if (phoneNumber) formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    if (facebookUsername) formData.append("facebookUsername", facebookUsername);
    if (image) {
      formData.append("image", image);
    }
    
    onSubmit(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 1,
        maxWidth: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sell an Item</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-gray-600 mb-3">Fields marked with an asterisk (*) are required</p>
          <TextField
            label="Item Name*"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description*"
            value={description}
            onChange={handleDescriptionChange}
            fullWidth
            required
            multiline
            rows={3}
            margin="normal"
            inputProps={{ maxLength: 500 }}
            helperText={`${descWordCount}/${MAX_WORD_COUNT} words`}
          />
          <TextField
            label="Price (₮)*"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            required
            type="number"
            margin="normal"
            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
          />
          
          <div className="flex items-center mt-1 mb-3">
            <input
              type="checkbox"
              id="hide-price"
              checked={hidePrice}
              onChange={(e) => setHidePrice(e.target.checked)}
              className="mr-2 h-4 w-4"
            />
            <label htmlFor="hide-price" className="text-sm text-gray-600">
              Hide price from public view (buyers must contact you for price)
            </label>
          </div>
          
          <FormControl fullWidth required margin="normal">
            <InputLabel id="category-label">Category*</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as string)}
              label="Category*"
            >
              {categories.slice(1).map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required margin="normal">
            <InputLabel id="condition-label">Condition*</InputLabel>
            <Select
              labelId="condition-label"
              value={condition}
              onChange={(e) => setCondition(e.target.value as string)}
              label="Condition*"
            >
              {conditions.map((cond) => (
                <MenuItem key={cond} value={cond}>
                  {cond}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            type="email"
          />
          
          <Divider className="my-4" />
          <p className="text-sm text-gray-600 mb-2 italic">Optional Fields</p>
          
          <TextField
            label="Seller Name (Optional)"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number (Optional)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin="normal"
            helperText="8-digit format"
          />
          <TextField
            label="Facebook Username (Optional)"
            value={facebookUsername}
            onChange={(e) => setFacebookUsername(e.target.value)}
            fullWidth
            margin="normal"
          />

          <div className="my-4">
            <p className="text-sm mb-2">Upload Image*</p>
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              id="upload-image"
              style={{ display: "none" }}
            />
            <label htmlFor="upload-image">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white" type="button" asChild>
                <span>Select Image</span>
              </Button>
            </label>
            {imagePreview && (
              <div className="mt-3">
                <img src={imagePreview} alt="Preview" className="max-h-40 rounded border" />
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              onClick={handlePreview}
              variant="outline"
              type="button"
              className="flex items-center"
            >
              <EyeIcon className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button 
              onClick={handleClose} 
              variant="outline"
              type="button"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Listing..." : "List Item"}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}