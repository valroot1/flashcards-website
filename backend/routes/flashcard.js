import express from 'express';
import { getFlashcardbyId, getUserFlashcards } from '../controllers/flashcard.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/getFlashcard/:id", protectRoute, getFlashcardbyId);
router.get("/getFlashcards", protectRoute, getUserFlashcards);

export default router;