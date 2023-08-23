const express = require("express");
const router = express.Router();

// import model into router
const Movie = require("../models/movie");

/* list all the movies */
router.get("/", async (req, res) => {
  const { genre, rating, release_year } = req.query;
  let filter = {};
  /* old method */
  // if (genre) {
  //   list = await movie.find({ genre: genre });
  // } else if (rating) {
  //   list = await movie.find({ rating: { $gt: rating } });
  // } else if (release_year) {
  //   list = await movie.find({ release_year: { $gt: release_year } });
  // } else {
  //   list = await movie.find();
  // }

  /* better filtering method */
  if (genre || rating || release_year) {
    if (genre) {
      filter.genre = genre; // { genre: genre }
    }
    if (rating) {
      filter.rating = { $gt: rating }; // { rating: { $gt: rating } }
    }
    if (release_year) {
      filter.release_year = { $gt: release_year }; // { release_year: { $gt: release_year } }
    }
  }

  res.send(await Movie.find(filter));
});

/* get specific Movie by id */
router.get("/:id", async (req, res) => {
  const data = await Movie.findOne({ _id: req.params.id });
  res.send(data);
});

router.post("/", async (req, res) => {
  const newMovie = new Movie({
    title: req.body.title,
    director: req.body.title,
    release_year: req.body.release_year,
    genre: req.body.genre,
    rating: req.body.rating,
  });
  await newMovie.save();
  res.send(newMovie);
});

router.put("/:id", async (req, res) => {
  const movie_id = req.params.id;
  const updatedMovie = await Movie.findByIdAndUpdate(movie_id, req.body, {
    new: true,
  });
  res.send(updatedMovie);
});

router.delete("/:id", async (req, res) => {
  const movie_id = req.params.id;
  const deletedMovie = await Movie.findByIdAndDelete(movie_id);
  res.send(deletedMovie);
});

module.exports = router;
