import express from 'express';
import { getFlashcardbyId, addFlashcard, getGroupFlashcards, modifyFlashcard, deleteFlashcard } from '../controllers/flashcard.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/:id", protectRoute, getFlashcardbyId);
router.get("/group/:id", protectRoute, getGroupFlashcards);
router.post("/", protectRoute, addFlashcard);
router.put("/:id", protectRoute, modifyFlashcard);
router.delete("/:id", protectRoute, deleteFlashcard);

export default router;