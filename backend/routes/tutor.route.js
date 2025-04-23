import express from 'express';
import { contactTutor } from '../controller/tutor.controller.js';

const router = express.Router();

// Route for contacting a tutor
router.post('/contact', contactTutor);

export default router;