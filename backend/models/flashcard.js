import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    definition:{
        type: String,
        required: true
    }
},{
    timestamps: true // createdAt, updatedAt
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

export default Flashcard;