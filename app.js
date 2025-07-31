const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json())

app.use(cors());

const port = 3000;

const gigs = [
  {
    name: 'Sigur Rós',
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQUzmM08u1_dWG0QQULdMw4sucLhfLdUOXck36VJdbnG6AP0dfqKA7qrKkaLxvlFgkjnh3tIby2iK-1TyWNVfUAMw',
    description: 'Icelandic post-rock band',
    date: new Date("August 17, 2025 21:00:00"),
    location: 'Reykjavík, Iceland',
    id: 1
  },
  {
    name: 'Car Seat Headrest',
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQ6EDvFPlTUrSfUosh6x94cAq9NRiISxZUp5goMMgD3oD5RztaYkAhWO1lPvtl8mk4URxPltzpVo3C8DSTOsZskaysXIu3zqnHS9MaDDsaGQ',
    description: 'American indie rock band',
    date: new Date("September 10, 2025 20:00:00"),
    location: 'Seattle, WA, USA',
    id: 2
  },
  {
    name: 'Chumbawamba',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkabWaZtW90IHfT36b2-yTBs279lW3Pn7iX033Z1wfw1bApeO86qWwDYlMDmdqr7s0qqQIfClC34bEnuVRouzh3vuGBbTDv8ReEC8FgEaTJQ',
    description: 'British alternative/indie/punk band',
    date: new Date("October 21, 2025 22:00:00"),
    location: 'London, UK',
    id: 3
  }
]

app.get('/gigs', (req, res) => {
  res.json(gigs)
})

app.listen(port, () => {
  console.log("Now listening on port", port);
});

module.exports = gigs