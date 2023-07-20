const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const authenticate = require("../middlewares/authenticate");

// Create a new movie
router.post("/",authenticate, async (req, res) => {
  try {
    const movieData = req.body;
    const movie = await Movie.create(movieData);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: "Error creating movie", error: err });
  }
});

// Get all movies
router.get("/",authenticate, async (req, res) => {
  try {
    const movies = await Movie.find().populate("producer", "name");
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies", error: err });
  }
});

// Get a specific movie by ID
router.get("/:id",authenticate, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate("producer", "name")
      .populate("actors", "name");
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movie", error: err });
  }
});

// Update a movie
router.put("/:id",authenticate, async (req, res) => {
  try {
    const movieData = req.body;
    const movie = await Movie.findByIdAndUpdate(req.params.id, movieData, {
      new: true,
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Error updating movie", error: err });
  }
});

// Delete a movie
router.delete("/:id",authenticate, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting movie", error: err });
  }
});

module.exports = router;
