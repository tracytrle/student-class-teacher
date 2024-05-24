// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Create a new student
router.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Students
router.get("/students", async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single student with id

router.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(400).json({ error: "student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
