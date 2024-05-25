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
router.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
