require('dotenv').config();
const express = require('express');
const router = express.Router();
const { signUpSchema, signInSchema, updatedSchema } = require('../zodValidation/validation');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');

// POST /signup
router.post("/signup", async (req, res) => {
    const body = req.body;
    const parsed = signUpSchema.safeParse(req.body);
    if (!parsed.success) {
        console.log("Zod validation errors:", parsed.error.errors);
        return res.status(400).json({
            message: "Invalid input credentials",
            details: parsed.error.errors
        });
    }


    const existingUser = await User.findOne({ username: body.username });

    if (existingUser) {
        return res.status(409).json({
            message: "Username already taken"
        });
    }

    const user = await User.create(body);
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    });
});

// POST /signin
router.post("/signin", async (req, res) => {
    const { success } = signInSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Incorrect input format"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (!user) {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token });
});

// PUT /
router.put("/", authMiddleware, async (req, res) => {
    const parsed = updatedSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: "Error while updating information",
            details: parsed.error.errors
        });
    }

    try {
        const updateResult = await User.updateOne(
            { _id: req.userId },
            { $set: req.body }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        if (updateResult.modifiedCount === 0) {
            return res.status(400).json({
                message: "No changes made"
            });
        }

        res.json({
            message: "Updated successfully"
        });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// GET /bulk
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstName: { $regex: filter, $options: 'i' } },
            { lastName: { $regex: filter, $options: 'i' } }
        ]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

module.exports = router;
