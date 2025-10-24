const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

// ✅ Create User (Sign Up)
router.post("/createUser", (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  // Step 1: Check if email exists
  db.query("CALL GetUserByEmail(?)", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    const existingUser = results[0][0];
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Step 2: Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Step 3: Insert user via SP
    db.query(
      "CALL CreateUser(?, ?, ?)",
      [userName, email, hashedPassword],
      (err2) => {
        if (err2) return res.status(500).json({ message: "DB error" });
        res.status(201).json({ message: "User created successfully" });
      }
    );
  });
});

// ✅ Sign In
router.post("/validateUser", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email & password required" });

  db.query("CALL GetUserByEmail(?)", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    const user = results[0][0];
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Sign in successful", token });
  });
});

// ✅ Fetch All Users
router.get("/allUsers", (req, res) => {
  db.query("CALL GetAllUsers()", (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    res.json({ users: results[0] });
  });
});

module.exports = router;
