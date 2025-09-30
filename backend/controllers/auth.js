import { User } from "../models/user.js";
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

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

        // Crypts password usign bcryptjs
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        // Creating new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        return res.status(201).json({success:true, message: "New User created succesfully"});
        
    } catch (error) {
        console.log("Error in creating new User: ", error.message);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export async function login (req, res) {
    res.send("Login route");
}

export async function logout (req, res) {
    try {
        res.clearCookie("jwt-flashcards");
        res.status(200).json({success: true, message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout: ", error.message);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}
