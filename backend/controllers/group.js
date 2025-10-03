import { Group } from "../models/group.js";

export async function getGroup(req, res) {

    try {
        const { id } = req.params; // Group id
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid group id" });
        }

        // Check if Group is linked to the user
        const group = await Group.findOne({ _id: id, user: userId});
        if(!group) {
            return res.status(404).json({ success: false, message: "Invalid group id"});
        }

        return res.status(200).json({ success:true, message: "Group obtained", data: group});

    } catch (error) {
        console.log("Error in retrieving Group: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error"});
    }
}

export async function addGroup(req, res) {
    const { user, name, description } = req.body;

    // Input checks
    if(!user || !name || !description) {
        return res.status(400).json({ success: false, message: "All fields are required"});
    }

    const newGroup = new Group({
        user,
        name,
        description
    });

    await newGroup.save();
    return res.status(201).json({ success: true, message: "New group created successfully"});
}

export async function modifyGroup(req, res) { }