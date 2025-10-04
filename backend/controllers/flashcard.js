import mongoose from 'mongoose';
import { Flashcard } from '../models/flashcard.js';

export async function getFlashcardbyId(req, res) {
    const { id } = req.params;
    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid group id" });
        }

        const data = await Flashcard.findById(id);
        return res.status(200).json({ success: true, message: "Flashcard obtained", data: data });
    } catch (error) {
        console.log("Error in getting Flashcard: " + error.message);
        return res.status(404).json({ success: false, message: "Flashcard not found" });
    }
}

export async function getGroupFlashcards(req, res) {
    try {
        const { id } = req.params; // id della collezione
        const flashcards = await Flashcard.find({ group: id });

        if (flashcards === undefined || flashcards.length == 0) {
            return res.status(400).json({ success: false, message: "No flashcards found" });
        }

        return res.status(200).json({ success: true, message: "Flashcards obtained", data: flashcards });
    } catch (error) {
        console.log("Error in getting flashcards: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function addFlashcard(req, res) {
    try {
        const { group, title, definition } = req.body;

        // Strings Checks
        if (!group || !title || !definition) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newFlashcard = new Flashcard({
            group,
            title,
            definition
        });
        await newFlashcard.save();
        return res.status(201).json({ success: true, message: "New flashcard created successfully", data: newFlashcard });

    } catch (error) {
        console.log("Error in creating new flashcard: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function modifyFlashcard(req, res) {
    try {
        const { id } = req.params;
        const { title, definition } = req.body;

        if (!groupId || !id || !title || !definition) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingFlashcard = await Flashcard.findById(id);

        if (!existingFlashcard) {
            return res.status(404).json({ success: false, message: "Flashcard not found" });
        }

        existingFlashcard.title = title;
        existingFlashcard.definition = definition;
        await existingFlashcard.save();
        return res.status(200).json({ success: true, message: "Flashcard updated successfully", data: existingFlashcard });
    } catch (error) {
        console.log("Error in updating flashcard: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

}

export async function deleteFlashcard(req, res) {
    try {
        const { id } = req.params;
        const existingFlashcard = await Flashcard.findById(id);
        if (!existingFlashcard) {
            return res.status(404).json({ success: false, message: "Flashcard not found" });
        }

        await existingFlashcard.deleteOne();
        return res.status(200).json({ success: true, message: "Flashcard deleted successfully" });

    } catch (error) {
        console.log("Error in deleting flashcard: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}