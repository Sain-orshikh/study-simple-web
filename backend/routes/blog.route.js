import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
import { 
    createBlog, 
    deleteBlog, 
    fetchBlogs, 
    fetchBlog, 
    likeBlog,
    unlikeBlog,
    dislikeBlog, 
    updateBlog
} from "../controller/blog.controller.js";

const router = express.Router();

router.get("/fetch/:id", fetchBlog);
router.get("/fetch", fetchBlogs);
router.post("/create", upload.single("image"), createBlog);
router.put("/update/:id", upload.single("image"), updateBlog);
router.delete("/delete/:id", deleteBlog);

// Routes for likes and dislikes
router.post("/like/:id", likeBlog);
router.post("/unlike/:id", unlikeBlog);
router.post("/dislike/:id", dislikeBlog);

export default router;