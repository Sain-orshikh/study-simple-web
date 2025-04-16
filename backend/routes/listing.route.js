import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
import { 
  createListing, 
  deleteListing, 
  fetchListings, 
  fetchListing, 
  updateListing,
  submitSupportTicket
} from "../controller/listing.controller.js";

const router = express.Router();

router.get("/fetch/:id", fetchListing);
router.get("/fetch", fetchListings);
router.post("/create", upload.single("image"), createListing);
router.put("/update/:listingId", upload.single("image"), updateListing);
router.delete("/delete/:id", deleteListing);
router.post("/support", submitSupportTicket);

export default router;