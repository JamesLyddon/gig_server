const express = require("express");
const cors = require("cors");
const gigs = require('./data/gigsData.js')

const app = express();
app.use(express.json())
app.use(cors());

// middleware
const indexFromId = (req, res, next) => {
  const { id } = req.params
  const gigId = parseInt(id)

  if(isNaN(gigId)) return res.sendStatus(400)
  
  const gigIndex = gigs.findIndex(
    gig => gig.id === gigId
  )

  if(gigIndex === -1) return res.sendStatus(404)

  req.gigIndex = gigIndex
  next()
}


app.get('/gigs', (req, res) => {
  res.json(gigs)
})

// /gigs/:id	GET	{"gig": {Gig where the id matches the one provided in the url}}
app.get('/gigs/:id', indexFromId, (req, res) => {
  const { gigIndex } = req
  res.json(gigs[gigIndex])
})


module.exports = app
