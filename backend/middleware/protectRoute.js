import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { ENV_VARS } from '../config/envVars.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-flashcards"];

        if(!token) {
            return res.status(401).json({success:false, message:"You need to be logged in to access this page"});
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({success:false, message:"Invalid authentication"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error: invalid authentication");
        return res.status(500).json({success:false, message:"Internal server error"});
    }
}