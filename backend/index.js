const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../frontend")); 

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/carwashdb")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Error:", err));

// Register endpoint
app.post("/register", async (req, res) => {
    const { name, email, password, mobile } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, mobile });
        await newUser.save();
        res.json({ message: "Registration successful!" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Incorrect password" });

        res.json({ message: "Login successful!" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
