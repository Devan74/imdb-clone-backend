const express = require("express");
const router = express.Router();
const Actor = require("../models/Actor");
const authenticate = require("../middlewares/authenticate");

// Create a new actor
router.post("/",authenticate, async (req, res) => {
  try {
    const actorData = req.body;
    const actor = await Actor.create(actorData);
    res.status(201).json(actor);
  } catch (err) {
    res.status(400).json({ message: "Error creating actor", error: err });
  }
});

// Get all actors
router.get("/",authenticate, async (req, res) => {
  try {
    const actors = await Actor.find();
    res.json(actors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching actors", error: err });
  }
});

// Get a specific actor by ID
router.get("/:id",authenticate, async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }
    res.json(actor);
  } catch (err) {
    res.status(500).json({ message: "Error fetching actor", error: err });
  }
});

// Update an actor
router.put("/:id",authenticate, async (req, res) => {
  try {
    const actorData = req.body;
    const actor = await Actor.findByIdAndUpdate(req.params.id, actorData, {
      new: true,
    });
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }
    res.json(actor);
  } catch (err) {
    res.status(500).json({ message: "Error updating actor", error: err });
  }
});

// Delete an actor
router.delete("/:id",authenticate, async (req, res) => {
  try {
    const actor = await Actor.findByIdAndDelete(req.params.id);
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }
    res.json({ message: "Actor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting actor", error: err });
  }
});

module.exports = router;
