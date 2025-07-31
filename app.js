const express = require("express");
const cors = require("cors");
const gigs = require('./data/gigsData.js')

const app = express();
app.use(express.json())

app.use(cors());

app.get('/gigs', (req, res) => {
  res.json(gigs)
})

module.exports = app
