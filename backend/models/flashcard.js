import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
    collection: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Collection",
			required: true,
		},
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

export const Flashcard = mongoose.model('Flashcard', flashcardSchema);