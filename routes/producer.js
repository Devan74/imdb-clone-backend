const express = require("express");
const router = express.Router();
const Producer = require("../models/Producer");
const authenticate = require("../middlewares/authenticate");

// Create a new producer
router.post("/",authenticate, async (req, res) => {
  try {
    const producerData = req.body;
    const producer = await Producer.create(producerData);
    res.status(201).json(producer);
  } catch (err) {
    res.status(400).json({ message: "Error creating producer", error: err });
  }
});

// Get all producers
router.get("/",authenticate, async (req, res) => {
  try {
    const producers = await Producer.find();
    res.json(producers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching producers", error: err });
  }
});

// Get a specific producer by ID
router.get("/:id",authenticate, async (req, res) => {
  try {
    const producer = await Producer.findById(req.params.id);
    if (!producer) {
      return res.status(404).json({ message: "Producer not found" });
    }
    res.json(producer);
  } catch (err) {
    res.status(500).json({ message: "Error fetching producer", error: err });
  }
});

// Update a producer
router.put("/:id",authenticate, async (req, res) => {
  try {
    const producerData = req.body;
    const producer = await Producer.findByIdAndUpdate(
      req.params.id,
      producerData,
      { new: true }
    );
    if (!producer) {
      return res.status(404).json({ message: "Producer not found" });
    }
    res.json(producer);
  } catch (err) {
    res.status(500).json({ message: "Error updating producer", error: err });
  }
});

// Delete a producer
router.delete("/:id",authenticate, async (req, res) => {
  try {
    const producer = await Producer.findByIdAndDelete(req.params.id);
    if (!producer) {
      return res.status(404).json({ message: "Producer not found" });
    }
    res.json({ message: "Producer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting producer", error: err });
  }
});

module.exports = router;
