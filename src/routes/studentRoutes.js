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

// Create multiple students
router.post("/students/bulk", async (req, res) => {
  try {
    const students = await Student.bulkCreate(req.body);
    res.status(201).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Students
// router.get("/students", async (req, res) => {
//   try {
//     const students = await Student.findAll();
//     res.status(200).json(students);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
router.get("/students", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;
  try {
    const { count, rows } = await Student.findAndCountAll({
      limit: pageSize,
      offset: offset,
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
      pageSize: pageSize,
      student: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

// delete a student
router.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.destroy();
      res.status(200).json(student);
    } else {
      res.status(400).json({ error: "student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update a student
router.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.update(req.body);
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: "student not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
