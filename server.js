import express from "express";
import { users } from "./models/User.js";
import { DBConnect } from "./db.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
//configure to express
const app = express();
//connect to database
DBConnect();

app.use(express.json());
//GET: RETURN ALL USERS
app.get("/", async (req, res) => {
  try {
    const allUsers = await users.find();
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: ADD A NEW USER TO THE DATABASE
app.post("/add", async (req, res) => {
  const user = new users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: EDIT A USER BY ID
app.put("/:id", async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: REMOVE A USER BY ID
app.delete("/:id", async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//running server in port 3000
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
