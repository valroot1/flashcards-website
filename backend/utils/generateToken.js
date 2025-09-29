import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: "14d"});

    res.cookie("jwt-flashcards", token, {
        maxAge: 14*24*60*60*1000, // 14 days in milliseconds
        httpOnly: true, // Prevents XSS attacks cross-site scripting attacks, make it not be accessible on js
        sameSite:"strict",
        secure: ENV_VARS.NODE_ENV !== "development" 
    });
    return token;
};
