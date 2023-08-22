const express = require("express");
const router = express.Router();

const tvshow = require("../models/tvshow");

router.get("/", async (req, res) => {
  const { premiere_year, genre, rating } = req.query;
  let filter = {};
  if (premiere_year || genre || rating) {
    if (premiere_year) {
      filter.premiere_year = { $gt: premiere_year }; // { genre: genre }
    }
    if (genre) {
      filter.genre = { $gt: genre }; // { rating: { $gt: rating } }
    }
    if (rating) {
      filter.rating = { $gt: rating }; // { release_year: { $gt: release_year } }
    }
  }
  res.send(await tvshow.find(filter));
});

router.get("/:id", async (req, res) => {
  const onetvshow = await tvshow.findOne({ _id: req.params.id });
  res.send(onetvshow);
});

module.exports = router;
