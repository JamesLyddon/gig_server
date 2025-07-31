const express = require('express');
const cors = require('cors');
const indexFromId = require('./middleware/indexFromId.js')
const gigs = require('./data/gigsData.js')

const app = express();
app.use(express.json())
app.use(cors());

app.get('/gigs', (req, res) => {
  res.json(gigs)
})

app.get('/gigs/:id', indexFromId, (req, res) => {
  const { gigIndex } = req
  res.json(gigs[gigIndex])
})

app.delete('/gigs/:id', indexFromId, (req, res) => {
  const {gigIndex} = req
  gigs.splice(gigIndex, 1)
  res.json({"message": "Successfully deleted gig", "gigs": gigs})
})

app.post('/gigs', (req, res) => {
  const { gig } = req.body
  const newGig = {...gig, id: gigs[gigs.length - 1].id + 1, date: new Date(gig.date)}
  gigs.push(newGig)

  return res.json(
    {"message": "Successfully posted new gig", "gigs": gigs}
  )
})

module.exports = app
