import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true
    }, 
    description: {
        type: String, 
        required: false
    }
},
{
    timestamps: true // createdAt, updatedAt
});

export const Collection = mongoose.model('Collection', collectionSchema);