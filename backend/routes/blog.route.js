import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
import { createBlog, deleteBlog, fetchBlogs, fetchBlog } from "../controller/blog.controller.js";

const router = express.Router();

router.get("/fetch/:id", fetchBlog);
router.get("/fetch", fetchBlogs);
router.post("/create", upload.single("image"), createBlog);
router.delete("/delete/:id", deleteBlog);

export default router;