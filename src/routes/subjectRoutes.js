const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

// Create a new Subject

router.post("/subjects", async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create multiple subjects
router.post("/subjects/bulk", async (req, res) => {
  try {
    const subjects = await Subject.bulkCreate(req.body);
    res.status(201).json(subjects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get all subjects
// router.get("/subjects", async (req, res) => {
//   try {
//     const subjects = await Subject.findAll();
//     res.status(200).json(subjects);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

router.get("/subjects", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;
  try {
    const { count, rows } = await Subject.findAndCountAll({
      limit: pageSize,
      offset: offset,
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
      pageSize: pageSize,
      subjects: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single subject with id
router.get("/subjects/:id", async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);
    if (subject) {
      res.status(200).json(subject);
    } else {
      res.status(400).json({ error: "subject not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete a class
router.delete("/subjects/:id", async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);
    if (subject) {
      await subject.destroy();
      res.status(200).json(subject);
    } else {
      res.status(400).json({ error: "subject not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update a subject
router.put("/subjects/:id", async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);
    if (subject) {
      await subject.update(req.body);
      res.status(200).json(subject);
    } else {
      res.status(404).json({ error: "subject not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
