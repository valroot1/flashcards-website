import { User } from "../models/user.js";

export async function signup (req, res) {
    try {
        const {username, email, password} = req.body;

        // Checks input 
        if(!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required"});
        } 

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: "Invalid email"});
        }

        if(password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters"});
        }

        // Checks if email and username arleady exists
        const existingUserByEmail = await User.findOne({email:email});
        if(existingUserByEmail) {
            return res.status(400).json({success: false, message: "Email already exists"});
        }

        const existingUserByUsername = await User.findOne({username:username});

        if(existingUserByUsername) {
            return res.status(400).json({success: false, message: "Username already exists"});
        }

        // Creating new user
        const newUser = new User({
            username: username,
            email: email,
            password: password
        });

        await newUser.save();

    } catch (error) {
        console.log("Error in creating new User: ", error.message);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export async function login (req, res) {
    res.send("Login route");
}

export async function logout (req, res) {
    res.send("Logout route");
}
