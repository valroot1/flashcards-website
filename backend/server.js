import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Flashcard from './models/flashcard.js';
import authRoutes from './routes/auth.js';
import { ENV_VARS } from './config/envVars.js';

const PORT = ENV_VARS.PORT;

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
    app.listen(PORT, () => {
        console.log('Server started at http://localhost:' + PORT);
    });
}).catch((err) => {
    console.error("Failed to connect DB:", err.message);
});