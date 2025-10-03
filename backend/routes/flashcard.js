import express from 'express';
import { getFlashcardbyId, getFlashcardsbyGroup, addFlashcard } from '../controllers/flashcard.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/getFlashcard/:id", protectRoute, getFlashcardbyId);
router.get("/getFlashcards/:id", protectRoute, getFlashcardsbyGroup);
router.post("/addFlashcard", protectRoute, addFlashcard);

export default router;