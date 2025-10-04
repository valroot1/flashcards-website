import mongoose from 'mongoose';
import { Group } from "../models/group.js";

export async function getAllGroups(req,res) {
    try {
        const userId = req.user._id;

        const groups = await Group.find({ user: userId });

        if(!group) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }

        return res.status(200).json({ success: true, message: "All group obtained", data: groups});
    } catch (error) {
        console.log("Error in retrieving Groups: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function getGroup(req, res) {

    try {
        const { id } = req.params; // Group id
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid group id" });
        }

        // Check if Group is linked to the user
        const group = await Group.findOne({ _id: id, user: userId });
        if (!group) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }
        return res.status(200).json({ success: true, message: "Group obtained", data: group });

    } catch (error) {
        console.log("Error in retrieving Group: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function addGroup(req, res) {
    try {
        const userId = req.user._id;
        const { name, description } = req.body;

        // Input checks, description is optional
        if (!name) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check existing group
        const existingGroup = await Group.findOne({ user: userId, name: name });
        if (existingGroup) {
            return res.status(400).json({ success: false, message: "Name of group already exists" });
        }

        const newGroup = new Group({
            user: userId,
            name,
            description
        });

        await newGroup.save();
        return res.status(201).json({ success: true, message: "New group created successfully", data: newGroup });
    } catch (error) {
        console.log("Error in creating Group: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function modifyGroup(req, res) { 
    try {
        const { id } = req.params; // GroupId
        const userId = req.user._id;
        const { name, description } = req.body;

        // Check inputs, description is optional
        if(!name || !id) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        //Check group id and if it's linked to right user
        const existingGroup = await Group.findOne({ _id: id, user: userId});
        if(!existingGroup) {
            return res.status(404).json({ success:false, message: "Group not found"});
        }

        existingGroup.name = name;
        existingGroup.description = description;
        existingGroup.save();
        return res.status(201).json({ success: true, message: "Group updated successfully", data: existingGroup });
    } catch (error) {
        console.log("Error in modifying Group: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error"});
    }
}

export async function deleteGroup(req, res){
    try {
        const { id } = req.params;

        const existingGroup = await Group.findOne({ _id: id, user: req.user._id });
        if(!existingGroup) {
            return res.status(404).json({ success:false, message: "Group not found"});
        }

        await existingGroup.deleteOne();
        return res.status(201).json({ success: true, message: "Group deleted successfully"});
    } catch (error) {
        console.log("Error in deleting Group: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error", data: existingGroup });
    }
}