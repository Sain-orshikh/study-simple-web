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
    addComment, 
    getComments,
    updateBlog
} from "../controller/blog.controller.js";

const router = express.Router();

router.get("/fetch/:id", fetchBlog);
router.get("/fetch", fetchBlogs);
router.post("/create", upload.single("image"), createBlog);
router.put("/update/:id", upload.single("image"), updateBlog);
router.delete("/delete/:id", deleteBlog);

// Routes for likes, dislikes, and comments
router.post("/like/:id", likeBlog);
router.post("/unlike/:id", unlikeBlog);
router.post("/dislike/:id", dislikeBlog);
router.post("/comment/:id", addComment);
router.get("/comments/:id", getComments);

export default router;