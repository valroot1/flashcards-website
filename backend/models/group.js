import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    }, 
    description: {
        type: String, 
        required: false
    }
},
{
    timestamps: true // createdAt, updatedAt
});

groupSchema.index({ user: 1, name: 1 }, { unique: true });

export const Group = mongoose.model('Group', groupSchema);