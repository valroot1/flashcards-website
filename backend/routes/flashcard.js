import express from 'express';
import { getFlashcardbyId, addFlashcard, getGroupFlashcards } from '../controllers/flashcard.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/getFlashcard/:id", protectRoute, getFlashcardbyId);
router.get("/getFlashcards/:id", protectRoute, getGroupFlashcards);
router.post("/addFlashcard", protectRoute, addFlashcard);

export default router;