const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register route
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the username and email are already taken
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: "Username or email already taken" });
      }
  
      // Hash the password before saving it to the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      const savedUser = await newUser.save();
  
      // Create and sign a JWT token for the newly registered user
      const token = jwt.sign({ user: savedUser.id }, config.jwtSecret, {
        expiresIn: "1h", // Token will expire in 1 hour
      });
  
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: "Error registering user", error: err });
    }
  });

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and sign a JWT token for the authenticated user
    const token = jwt.sign({ user: user.id }, config.jwtSecret, {
      expiresIn: "1h", // Token will expire in 1 hour
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error authenticating user", error: err });
  }
});

// Logout route (Not necessary with JWT as JWTs are stateless, but included for completeness)
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
