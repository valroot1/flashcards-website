import express from 'express';
import { getFlashcard } from '../controllers/flashcard.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/getFlashcard/:id", protectRoute, getFlashcard);

export default router;