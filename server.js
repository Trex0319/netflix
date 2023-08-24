const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/netflix")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const moviesRouter = require("./routes/movie");
const tvshowRouter = require("./routes/tvshow");
const newreviewRouter = require("./routes/newreview");

app.use("/movies", moviesRouter);
app.use("/tvshows", tvshowRouter);
app.use("/reviews", newreviewRouter);

app.get("/", (req, res) => {
  res.send("<a href='/movies'>Movies</a><a href='/tvshows'>tvshow</a>");
});

app.listen(2000, () => {
  console.log(
    "National Park Visitor System is running on port http://localhost:2000"
  );
});
