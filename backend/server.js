import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import flashcardRoutes from './routes/flashcard.js';
import groupRoutes from './routes/group.js';
import { ENV_VARS } from './config/envVars.js';
import cookieParser from 'cookie-parser';

const PORT = ENV_VARS.PORT;

dotenv.config();

const app = express();

app.use(express.json()); // Allows us to accept JSON data in the req.body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/flashcard", flashcardRoutes);
app.use("/api/group", groupRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server started at http://localhost:' + PORT);
    });
}).catch((err) => {
    console.error("Failed to connect DB:", err.message);
});