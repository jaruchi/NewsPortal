const express = require("express");
const cors = require("cors");

const db = require("./app/models");
const news = require('./app/routes/news');
const user = require('./app/routes/user');
const pref = require('./app/routes/pref');

var corsOptions = {
  origin: "http://localhost:4200"
};


const app = express();
app.use(cors(corsOptions));
app.use(express.json());// parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }));// parse requests of content-type - application/x-www-form-urlencoded

// Routing
// app.use('/', express.static('public'))

app.use(express.static(__dirname + '/../dist/newsfeedapp'));

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to news lake api." });
});

app.use('/api/news', news);
app.use('/api/user', user);
app.use('/api/fav', pref);

// db.dropAndResync();
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});