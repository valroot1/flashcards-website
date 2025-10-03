import { Flashcard } from '../models/flashcard.js';

export async function getFlashcardbyId(req, res) {
    const { id } = req.params;
    try {
        const data = await Flashcard.findById(id);
        return res.status(200).json({success:true, message:"Flashcard obtained", data: data});
    } catch (error) {
        console.log("Error in getting Flashcard: " + error.message);
        return res.status(404).json({success:false, message:"Flashcard not found"});
    }
}

export async function getFlashcardsbyGroup(req, res) {
    try {
        const { id } = req.params; // id della collezione
        const flashcards = await Flashcard.find({ group: id });

        if(flashcards === undefined || flashcards.length == 0) {
            return res.status(400).json({success: false, message: "No flashcards found"});
        }

        return res.status(200).json({success: true, flashcards});
    } catch (error) {
        console.log("Error in getting flashcards: ", error.message);
        return res.status(500).json({success:false, message: "Internal server error"});
    }
}

export async function addFlashcard(req,res){
    return;
}