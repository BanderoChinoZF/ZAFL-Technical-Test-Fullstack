import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import user from "../models/Login";

const SECRET_KEY = process.env.SECRET_KEY || "l3gasp1P@s3cR3tK3y";

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await user.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
        username,
        password: hashedPassword,
    });
    
    user.create(newUser)
        .then(() => res.status(201).json({ message: "User registered successfully" }))
        .catch((error) => {
            console.error("Registration error:", error); 
            res.status(400).json({ message: "Error try register new user" })
        });
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    console.log("Login attempt for user:", username);

    try {
        // Find user by username
        const userRecord = await user.findOne({ username });
        if (!userRecord) {
            console.error("User not found:", username);
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, userRecord.password);
        if (!isMatch) {
            console.error("Invalid credentials for user:", username);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: userRecord._id }, SECRET_KEY, { expiresIn: "1d" });

        console.log("Login successful for user:", username);
        // Return token
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};








