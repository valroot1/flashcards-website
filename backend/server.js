import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Flashcard from './models/flashcard.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.use(express.json()); // Allows us to accept JSON data in the req.body

app.use("/api/v1/auth", authRoutes);

app.post("/api/flashcards", async (req,res) => {
    const flashcard = req.body;

    if(!flashcard.title || !flashcard.definition) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields"
        });
    }

    const newFlashcard = new Flashcard(flashcard);

    try {
        await newFlashcard.save();
        res.status(201).json({ success: true, data: newFlashcard});
    } catch(error) {
        console.error("Error in create flashcard: ", error.message);
        res.status(500).json({ success:false, message: "Server Error"});
    }
})

connectDB().then(() => {
    app.listen(5000, () => {
        console.log('Server started at http://localhost:5000');
    });
}).catch((err) => {
    console.error("Failed to connect DB:", err.message);
});